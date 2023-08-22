<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { Timestamp, where, collection, query } from 'firebase/firestore';
	import type { Pedido } from '$lib/firebase-types';
	import { collectionStore } from 'sveltefire';
	import CardPedido from '$lib/cards/admin/CardPedido.svelte';

	// import type { PageData } from './$types';

	// export let data: PageData;

	let today = new Date();
	today.setHours(0, 0, 0, 0);
	const today_timestamp = Timestamp.fromDate(today);

	const pediRef = collection(firestore, 'pedidos');
	const q = query(pediRef, where('created', '>', today_timestamp));
	//@ts-ignore
	const pediStore = collectionStore<Pedido>(firestore, q);
	$: console.log($pediStore);

	let apenasRecentes = true;
	let barra_pesquisa = '';
	$: pedidos = $pediStore
		.filter((pedido) => {
			if (barra_pesquisa === '') {
				return !apenasRecentes || (pedido.status !== 'Entregue' && pedido.status !== 'Cancelado');
			}
			if (pedido.cliente.nome.toLowerCase().includes(barra_pesquisa.toLowerCase())) {
				return true;
			}
			if (pedido.cliente.mesa.toLowerCase().includes(barra_pesquisa.toLowerCase())) {
				return true;
			}
			if (pedido.produto.nome.toLowerCase().includes(barra_pesquisa.toLowerCase())) {
				return true;
			}
			if (pedido.cliente.nome.toLowerCase().includes(barra_pesquisa.toLowerCase())) {
				return true;
			}

			return !apenasRecentes || (pedido.status !== 'Entregue' && pedido.status !== 'Cancelado');
		})
		.sort((a, b) => {
			if (a.created < b.created) {
				return 1;
			}
			if (a.created > b.created) {
				return -1;
			}

			return 0;
		});
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
	{#each pedidos as pedido, i (pedido.id)}
		<CardPedido {pedido} id={pedido.id ?? ''} />
	{/each}
</div>
<!-- {#if pedidos}
	 <TesteChart pedidos={pedidos}/>
{/if} -->
