<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;

	import CardProduto from '$lib/cards/CardProduto.svelte';
	import CardIngrediente from '$lib/cards/admin/CardIngrediente.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cardapioStore, estoqueStore } from '$lib/firebase';
	import FormEstoqueIngrediente from '$lib/forms/admin/FormEstoqueIngrediente.svelte';
	import FormProduto from '$lib/forms/admin/FormProduto.svelte';
	import * as Table from '$lib/components/ui/table';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import type { Ingrediente } from '$lib/firebase-types';
	
	$: ingredientes = $estoqueStore?.items ?? [];
	let barra_pesquisa = '';


	let ingredientes_selecionados:Ingrediente[] = [];
	$:console.log(ingredientes_selecionados);
	
</script>

<main class="flex flex-col">
	<div class="sticky top-0 z-10 p-2 bg-background">
		<div class="flex flex-row items-center gap-3">
			<FormEstoqueIngrediente action={'create'}>
				<Button class="ml-1 hover:bg-blue-300">+ Cadastrar Produto</Button>
			</FormEstoqueIngrediente>
			<div class="grid grid-cols-4 items-center">
				<Label class="font-bold">Pesquisar:</Label>
				<Input
					id="name"
					bind:value={barra_pesquisa}
					class="col-span-3 bg-accent "
					placeholder="Produtos/Descrição/Categoria"
				/>
			</div>
		</div>
	</div>

	
	<Table.Root class='text-white'>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row class='text-white'>
				<Table.Head class="w-[100px] text-white">Nome</Table.Head>
				<Table.Head class='text-white'>Quant</Table.Head>
				<Table.Head class='text-white'>Preco por un</Table.Head>
				<Table.Head class="text-right text-white">Amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each ingredientes as produto, i (produto.id)}
				<Table.Row>
					<FormEstoqueIngrediente action={'update'} dfIngrediente={produto}>
						<Table.Cell class="font-medium">{produto.nome}</Table.Cell>
					</FormEstoqueIngrediente>
					<Table.Cell>{produto.quantidade}{produto.unidadeMedida}</Table.Cell>
					<Table.Cell>R${produto.preco} por {produto.unidadeMedida}</Table.Cell>
					<Table.Cell class="text-right">
					placeholder

					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

</main>
