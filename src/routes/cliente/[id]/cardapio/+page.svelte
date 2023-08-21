<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CardProduto from '$lib/cards/CardProduto.svelte';
	import { cardapioStore, firestore } from '$lib/firebase';
	import FormPedido from '$lib/forms/FormPedido.svelte';
	import type { Cliente } from '$lib/firebase-types';
	import { docStore } from 'sveltefire';
	import type { PageData } from './$types';
	import Loading from '$lib/Loading.svelte';

	//
	export let data: PageData;
	const cliente = docStore<Cliente>(firestore, 'clientes/' + data.identificador);
	//

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

{#if $cliente && $cliente.mesa != ''  }
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
						<FormPedido {produto} cliente={$cliente} id={cliente.id}>
							<CardProduto {produto} />
						</FormPedido>
					{/each}
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</main>
{:else}
	<Loading />
{/if}
