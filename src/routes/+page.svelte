<script lang="ts">
	import Card from './../lib/components/ui/card/card.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	import CardProduto from '$lib/cards/CardProduto.svelte';
	import { cardapioStore, estoqueStore } from '$lib/firebase';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let input = {
		nome: '',
		quantidade: 0
	};

	$: console.log(input);

	let produtos = $cardapioStore?.produtos ?? [];
	let estoque = $estoqueStore?.items ?? [];

	export let produto_selecionado = produtos[0];

	$: input_exists =
		estoque.some((item) => item.nome == input.nome) &&
		!produtos_add.some((item) => item.nome == input);

	let produtos_add: any[] = [];
</script>

<!-- show produto selecionado -->
{#if produto_selecionado}
	<div class="flex">
		<Card class="w-40">
			<CardProduto produto={produto_selecionado} />
		</Card>

		{#each produtos_add ?? [] as item}
			<p>{item.nome}</p>
		{/each}
	</div>
{/if}
{#each produtos_add as prod, i}
	<div>
		<div class="grid grid-cols-3 items-center gap-4">
			<Label class="text-right">{i}={prod.nome}</Label>

			<Button
				on:click={() => {
					produtos_add = produtos_add.filter((item) => item.nome !== prod.nome);
				}}>🗑️</Button
			>
		</div>
	</div>
{/each}
<div class="grid grid-cols-4 items-center gap-4">
	<Label class="text-right" for="name">Nome</Label>
	<Input id="name" bind:value={input.nome} class="col-span-2 bg-accent" placeholder="Farinha" />
	<Input id="quant" bind:value={input.quantidade} class=" bg-accent" placeholder="0" />
</div>
<Button
	on:click={() => {
		const produto = estoque.find((item) => item.nome === input.nome);
		if (produto && !produtos_add.some((item) => item.nome === input)) {
			produtos_add = [...produtos_add, produto];
		}
		console.log(produto);
	}}
	disabled={!input_exists}
>
	add one
</Button>
