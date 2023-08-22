<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cardapioStore, estoqueStore, storage } from '$lib/firebase';
	import type { IngredProduto, Produto } from '$lib/firebase-types';
	import { updateDoc, arrayUnion } from 'firebase/firestore';
	import { getFirebaseContext } from 'sveltefire';

	import * as Tabs from '$lib/components/ui/tabs';

	onMount(() => {
		if (dfProd.ingredientes != undefined) {
			ingredientes_add = dfProd.ingredientes;
		}
	});
	$: console.log($formData.ingredientes);
	let produtos = $cardapioStore?.produtos ?? [];
	let input_ingrediente = {
		nome: '',
		quantidade: 0
	};
	let ingredientes_add: IngredProduto[] = [];
	$: console.log(ingredientes_add + dfProd.nome);
	$: console.log(ingrediente_valido);
	$: ingrediente_valido = $estoqueStore?.items.some((item) => item.nome == input_ingrediente.nome);
	// !ingredientes_add.some((item) => item.nome == input_ingrediente.nome);

	const { auth, firestore } = getFirebaseContext();
	function generateUid(): string {
		const timestamp = new Date().getTime().toString();
		const random = Math.random().toString(36).substring(2); // Generate a random alphanumeric string
		return timestamp + random;
	}

	export let action = 'create';

	export let dfProd: Produto = {
		id: '',
		nome: '',
		categoria: '',
		descricao: '',
		preco: 0,
		subcategoria: '',
		vegano: false,
		visivel: true,
		url: ''
	};

	function handleSubmit() {
		if (action == 'create') {
			console.log('cadastrando produto');
			addProduto();
		} else if (action == 'update') {
			console.log('editando produto');
			editProduto();
		}

		console.log(dfProd);
	}

	const formDefaults = {
		nome: dfProd.nome,
		categoria: dfProd.categoria,
		descricao: dfProd.descricao ?? '',
		preco: dfProd.preco,
		subcategoria: dfProd.subcategoria,
		vegano: dfProd.vegano,
		visivel: dfProd.visivel,
		url: dfProd.url,
		ingredientes: ingredientes_add
	};

	const formData = writable(formDefaults);

	$: isValidCadastro =
		$formData.nome.length > 0 && $formData.categoria?.length > 0 && $formData.preco > 0;
	$: isValidUpdate =
		$formData.nome.length > 0 && $formData.categoria.length > 0 && $formData.preco > 0;

	async function addProduto() {
		const cardRef = cardapioStore.ref;

		if (cardRef == null) {
			console.log('cardRef undefined');
			return;
		}

		await updateDoc(cardRef, {
			produtos: arrayUnion({
				...$formData,
				id: generateUid()
			})
		});

		formData.set({
			nome: '',
			categoria: '',
			descricao: '',
			preco: 0,
			subcategoria: '',
			vegano: false,
			visivel: true,
			url: '',
			ingredientes: []
		});
		ingredientes_add = [];
		console.log('Produto cadastrado com sucesso');
	}

	async function editProduto() {
		const cardRef = cardapioStore.ref;

		const prods = $cardapioStore?.produtos;

		if (prods == undefined) {
			return;
		}

		let existe = prods?.find((p) => {
			if (p.id == dfProd.id) {
				console.log('prod existe');
				return true;
			}
		});

		if (cardRef == null || !existe) {
			console.log('cardRef undefined');
			return;
		}

		if (!isValidUpdate) {
			console.log('dados invalidos');
			return;
		}
		// console.log(ingredientes_add);
		console.log($formData);

		prods.forEach((p) => {
			if (p.id == dfProd.id) {
				p.nome = $formData.nome;
				p.categoria = $formData.categoria;
				p.descricao = $formData.descricao;
				p.preco = $formData.preco;
				p.subcategoria = $formData.subcategoria;
				p.vegano = $formData.vegano;
				p.visivel = $formData.visivel;
				p.url = $formData.url;
				p.ingredientes = $formData.ingredientes;
			}
		});

		await updateDoc(cardRef, {
			produtos: prods
		});
		ingredientes_add = [];

		console.log('Produto editado com sucesso');
	}

	// FOTO --------------

	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let previewURL: string = dfProd.url ?? '';
	let uploading = false;

	let idProduto = dfProd.id;
	async function upload(e: any) {
		uploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `produtos/${idProduto}.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);
		$formData.url = url;
		console.log('upload concluido' + url);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bg-card">
		<Dialog.Header>
			<Dialog.Title>Cadastrar Produto</Dialog.Title>
			<Dialog.Description>
				Preencha os campos abaixo para cadastrar um novo Produto.
			</Dialog.Description>
		</Dialog.Header>

		<Tabs.Root>
			<Tabs.List class="flex justify-center">
				<Tabs.Trigger value="dados">Cardapio</Tabs.Trigger>
				<Tabs.Trigger value="ingredientes">Ingredientes</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="dados">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<img
							class=""
							src={previewURL.length > 0
								? previewURL
								: 'https://firebasestorage.googleapis.com/v0/b/svelte-cardapio.appspot.com/o/static%2Fno_image.jpg?alt=media&token=cf56867b-39f9-4419-9d6c-aa94d7ce640a'}
							alt=""
							width="100"
							height="100"
						/>
						<Input
							class="col-span-3 bg-accent"
							on:change={upload}
							name="photoURL"
							type="file"
							accept="image/png, image/jpeg, image/gif, image/webp"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right" for="name">Nome</Label>
						<Input
							id="name"
							bind:value={$formData.nome}
							class="col-span-3 bg-accent"
							placeholder="Coca Cola"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="descricao" class="text-right">Descrição</Label>

						<Textarea
							id="descricao"
							class="col-span-3 bg-accent"
							placeholder="Descrição"
							bind:value={$formData.descricao}
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Categoria</Label>
						<Input
							id="categoria"
							bind:value={$formData.categoria}
							class="col-span-3 bg-accent"
							placeholder="Comida/Bebida"
						/>
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Subcategoria</Label>
						<Input
							id="subcategoria"
							bind:value={$formData.subcategoria}
							class="col-span-3 bg-accent"
							placeholder="Caldos/Fritos/Sanduiches"
						/>
					</div>

					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Preço:R$</Label>
						<Input
							id="subcategoria"
							type="number"
							min="0"
							step="0.01"
							bind:value={$formData.preco}
							class="col-span-3 bg-accent"
							placeholder="Caldos/Fritos/Sanduiches"
						/>
					</div>

					<div class="flex justify-around">
						<div class="flex items-center space-x-2">
							<Switch id="switch-vegano" bind:checked={$formData.vegano} />
							<Label for="switch-vegano" class="font-bold">Vegano</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Switch id="switch-visivel" bind:checked={$formData.visivel} />
							<Label for="switch-visivel" class="font-bold">Visivel no Cardapio</Label>
						</div>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="ingredientes">
				<div class="grid gap-4 py-4">
					{#each ingredientes_add as prod, i}
						<div class="grid grid-cols-2 items-center gap-4 justify-center">
							<Label class="justify-self-end">{prod.nome} {prod.quantidade}</Label>

							<Button class="justify-self-start"
								on:click={() => {
									ingredientes_add = ingredientes_add.filter((item) => item.nome !== prod.nome);
								}}>🗑️</Button
							>
						</div>
					{/each}
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right" for="name">Nome</Label>
						<Input
							id="name"
							bind:value={input_ingrediente.nome}
							class="col-span-2 bg-accent"
							placeholder="Farinha"
						/>
						<Input
							id="quant"
							type="number"
							bind:value={input_ingrediente.quantidade}
							class=" bg-accent"
							placeholder="0"
						/>
					</div>
					<Button
						on:click={() => {
							const ingredinete_estoque = $estoqueStore?.items.find(
								(item) => item.nome === input_ingrediente.nome
							);

							if (
								ingredinete_estoque &&
								!ingredientes_add.some((item) => item.nome === input_ingrediente.nome)
							) {
								let data = {
									id: ingredinete_estoque.id,
									nome: input_ingrediente.nome,
									quantidade: input_ingrediente.quantidade
								};
								console.log(data);
								ingredientes_add = [...ingredientes_add, data];
								$formData.ingredientes = [...ingredientes_add];
							}
						}}
						disabled={!ingrediente_valido}
					>
						add one
					</Button>
				</div>
			</Tabs.Content>
		</Tabs.Root>

		<Dialog.Footer>
			<Button
				type="submit"
				disabled={!isValidCadastro && !isValidUpdate}
				on:click={() => {
					handleSubmit();
					console.log(action);
				}}>Save changes</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
