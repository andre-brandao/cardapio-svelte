<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cardapioStore, storage } from '$lib/firebase';
	import type { Produto } from '$lib/firebase-types';
	import { updateDoc, arrayUnion } from 'firebase/firestore';
	import { getFirebaseContext } from 'sveltefire';
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
		visivel: true
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
		url: dfProd.url
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
			url: ''
		});
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
			}
		});

		await updateDoc(cardRef, {
			produtos: prods
		});
		console.log('Produto editado com sucesso');
	}

	// FOTO --------------

	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { writable } from 'svelte/store';

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

		// const cardRef = cardapioStore.ref;
		// const prods = $cardapioStore?.produtos;
		// if (prods == undefined || cardRef == undefined) {
		// 	console.log('produtos undefined erro ao salvar url');
		// 	return;
		// }
		// prods.forEach((p) => {
		// 	if (p.id == idProduto) {
		// 		p.url = url;
		// 	}
		// });
		// await updateDoc(cardRef, {
		// 	produtos: prods
		// });
		// console.log('Produto editado com sucesso');
		// // await updateDoc(doc(firestore, 'users', $user!.uid), { photoURL: url });
		// uploading = false;
	}

	// 	let file;
	// 	function chooseFile(e) {
	//     file = e.target.files[0];
	//   }
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
