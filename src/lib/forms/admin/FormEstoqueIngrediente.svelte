<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cardapioStore, storage, estoqueStore } from '$lib/firebase';
	import type { Ingreditente, Produto } from '$lib/firebase-types';
	import { updateDoc, arrayUnion } from 'firebase/firestore';
	import { getFirebaseContext } from 'sveltefire';

	const { auth, firestore } = getFirebaseContext();
	function generateUid(): string {
		const timestamp = new Date().getTime().toString();
		const random = Math.random().toString(36).substring(2); // Generate a random alphanumeric string
		return timestamp + random;
	}

	export let action = 'create';

	export let dfIngrediente: Ingreditente = {
		id: '',
		nome: '',

		preco: 0,
		quantidade: 0,
		unidadeMedida: ''
	};

	function handleSubmit() {
		if (action == 'create') {
			console.log('cadastrando produto');
			addProduto();
		} else if (action == 'update') {
			console.log('editando produto');
			editProduto();
		}

		console.log(dfIngrediente);
	}

	const formDefaults = {
		nome: dfIngrediente.nome,
		unidadeMedida: dfIngrediente.unidadeMedida,
		id: dfIngrediente.id,
		preco: dfIngrediente.preco,
		quantidade: dfIngrediente.quantidade
	};

	const formData = writable(formDefaults);

	async function addProduto() {
		const cardRef = estoqueStore.ref;

		if (cardRef == null) {
			console.log('cardRef undefined');
			return;
		}

		await updateDoc(cardRef, {
			items: arrayUnion({
				...$formData,
				id: generateUid()
			})
		});

		formData.set({
			nome: '',
			unidadeMedida: '',
			id: '',
			preco: 0,
			quantidade: 0
		});
		console.log('Produto cadastrado com sucesso');
	}

	async function editProduto() {
		const estoqueRef = estoqueStore.ref;

		const prods = $estoqueStore?.items;

		if (prods == undefined) {
			return;
		}

		let existe = prods?.find((p) => {
			if (p.id == dfIngrediente.id) {
				console.log('prod existe');
				return true;
			}
		});

		if (estoqueRef == null || !existe) {
			console.log('cardRef undefined');
			return;
		}

		prods.forEach((p) => {
			if (p.id == dfIngrediente.id) {
				p.nome = $formData.nome;
				p.preco = $formData.preco;
				p.quantidade = $formData.quantidade;
				p.unidadeMedida = $formData.unidadeMedida;
			}
		});

		await updateDoc(estoqueRef, {
			items: prods
		});
		console.log('Produto editado com sucesso');
	}

	// FOTO --------------

	import { writable } from 'svelte/store';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bg-card">
		<Dialog.Header>
			<Dialog.Title>Cadastrar Ingrediente</Dialog.Title>
			<Dialog.Description>
				Preencha os campos abaixo para cadastrar um novo Produto.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-4 py-4">
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
				<Label class="text-right">Preço:R$</Label>
				<Input
					id="subcategoria"
					type="number"
					min="0"
					step="0.01"
					bind:value={$formData.preco}
					class="col-span-3 bg-accent"
				/>
			</div>

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="um">Unidade Medida</Label>
				<Input
					id="um"
					bind:value={$formData.unidadeMedida}
					class="col-span-3 bg-accent"
					placeholder="KG, L, UN"
				/>
			</div>

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="um">Quantidade</Label>
				<Input
					id="um"
					bind:value={$formData.quantidade}
					class="col-span-3 bg-accent"
					placeholder="quantiade total"
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button
				type="submit"
				on:click={() => {
					handleSubmit();
					console.log(action);
				}}>Save changes</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
