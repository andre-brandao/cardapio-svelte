<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CardProduto from '$lib/cards/CardProduto.svelte';
	import { cardapioStore, firestore } from '$lib/firebase';
	import FormPedido from '$lib/forms/FormPedido.svelte';
	import type { Cliente } from '$lib/firebase-types';
	import { docStore } from 'sveltefire';
	import type { PageData } from './$types';
	import Loading from '$lib/Loading.svelte';
	import Notification from '$lib/Notification.svelte';

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
		return produtos_array.filter((prod) => prod.categoria == categoria).sort((a, b) => {
			if (a.nome < b.nome) {
				return -1;
			}
			if (a.nome > b.nome) {
				return 1;
			}

			return 0;
		})
	}

	let selected = 'Bebida';
</script>

{#if $cliente && $cliente.mesa != ''}
	<main class="flex flex-col">
		<Tabs.Root value={categorias[0]}>
			<div class="sticky top-0 z-10 p-2 bg-background">
				<Tabs.List class="flex overflow-y-scroll">
					{#each categorias as categoria}
						<Tabs.Trigger class="font-bold data-[state=active]:text-white" value={categoria}
							>{categoria}</Tabs.Trigger
						>
					{/each}
				</Tabs.List>
			</div>

			{#each categorias as categoria}
				<Tabs.Content value={categoria}>
					<div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
						{#each produtosFrom(categoria).filter((produto) => produto.visivel === true) as produto (produto.id)}
							<FormPedido {produto} cliente={$cliente} id={cliente.id}>
								<CardProduto {produto} />
							</FormPedido>
						{/each}
					</div>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
		<Notification let:payload duration={2000}>
			<span>
				{payload}
			</span>
		</Notification>
	</main>
{:else}
	<Loading />
{/if}

<style>
	span {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font: bold;
		background-color: white;
		border-top-left-radius: 0.5rem;
		color: black;
		/* display: block; */
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 2.5rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
		z-index: 10;
	}
</style>
