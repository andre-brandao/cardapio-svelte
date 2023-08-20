<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CardProduto from '$lib/cards/CardProduto.svelte';
	import { cardapioStore } from '$lib/firebase';

	$: produtos_array = $cardapioStore?.produtos ?? [];

	$: categorias = [...new Set(produtos_array.map((prod) => prod.categoria))];
	$: {
		console.log(categorias);
	}
	function produtosFrom(categoria: string) {
		return produtos_array.filter((prod) => prod.categoria == categoria);
	}

	let selected = 'Bebida';
</script>

<main class="flex flex-col">
	<Tabs.Root value={categorias[0]}>
		<div class="sticky top-0 z-10 p-2 bg-background">
			<Tabs.List class="flex overflow-y-scroll">
				{#each categorias as categoria}
					<Tabs.Trigger class="font-bold" value={categoria}>{categoria}</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</div>

		{#each categorias as categoria}
			<Tabs.Content value={categoria}>

				{#each produtosFrom(categoria) as produto}
					<CardProduto {produto} />
				{/each}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</main>
