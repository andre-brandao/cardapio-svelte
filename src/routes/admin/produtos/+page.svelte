<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;

	import CardProduto from '$lib/cards/CardProduto.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cardapioStore } from '$lib/firebase';
	import FormProduto from '$lib/forms/admin/FormProduto.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	$: produtos = $cardapioStore?.produtos ?? [];
	$: filtered_produtos = produtos.filter((produto) => {
		return (
			produto.nome.toLowerCase().includes(barra_pesquisa.toLowerCase()) ||
			produto.descricao?.toLowerCase().includes(barra_pesquisa.toLowerCase()) ||
			produto.categoria.toLowerCase().includes(barra_pesquisa.toLowerCase())
		);
	});
	let barra_pesquisa = '';
	$: categorias = [...new Set(filtered_produtos.map((prod) => prod.categoria))];

	function produtosFrom(categoria: string) {
		return filtered_produtos.filter((prod) => prod.categoria == categoria);
	}
</script>

<main class="flex flex-col">
	<div class="sticky top-0 z-10 p-2 bg-background">
		<div class="flex flex-row items-center gap-3">
			<FormProduto action={'create'}>
				<Button class="ml-1 hover:bg-blue-300">+ Cadastrar Produto</Button>
			</FormProduto>
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
	<Tabs.Root value={categorias[0]}>
		<div>
			<Tabs.List class="flex overflow-y-scroll">
				{#each categorias as categoria}
					<Tabs.Trigger class="font-bold data-[state=active]:text-white" value={categoria}
						>{categoria}</Tabs.Trigger
					>
				{/each}
			</Tabs.List>
		</div>
		<!-- {#each filtered_produtos as produto}
			<FormProduto action={'update'} dfProd={produto}>
				<CardProduto {produto} />
			</FormProduto>
			{/each} -->

		{#each categorias as categoria  (categoria)}
			<Tabs.Content value={categoria}>
				<div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
					{#each produtosFrom(categoria) as produto}
						<FormProduto action={'update'} dfProd={produto}>
							<CardProduto {produto} />
						</FormProduto>
					{/each}
				</div>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</main>
