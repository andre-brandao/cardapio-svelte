<script lang="ts">
	import { collection, getDocs } from 'firebase/firestore';
	import FistDataVis from '$lib/d3/FistDataVis.svelte';
	import { firestore } from '$lib/firebase';
	import type { Pedido } from '$lib/firebase-types';
	// import { pedidosStore } from "$lib/firebase";
	import { onMount } from 'svelte';
	import { collectionStore } from 'sveltefire';

	// let data;
	let pedidos: any[] = [];
	// //@ts-ignore
	// const q = query<Pedido>(pediRef, orderBy('created'));
	// export const pedidosStore = collectionStore<Pedido>(firestore, q);

	// $pedidosStore;

	onMount(async () => {
		const collectionRef = collection(firestore, 'pedidos');
		const documents = await getDocs(collectionRef);

		documents.forEach((doc) => {
			let data = {
				name: doc.data().produto.nome,
				x: doc.data().created.toDate(),
				y: doc.data().quantidade
			}
			pedidos = [...pedidos, data];
			// console.log(doc.data());
		});
		console.log(pedidos);
		
	});

	// data = $pedidosStore.map((pedido) => {
	// 	return {
	// 		nome: pedido.produto.nome,
	// 		x: pedido.created.toDate(),
	// 		y: pedido.quantidade
	// 	};
	// });
</script>

<nav class="gap-1">
	<a href="/cardapio">Cardapio</a>
	<a href="/admin/produtos">amin produtso</a>

	<a href="/cliente/mesa/QGRo1">mesa quarto 1</a>
</nav>

{#if pedidos.length > 20}
	<FistDataVis data={pedidos} />
{/if}
<!-- 
<Timeline
	data={data.timeline}
	xAccessor={dateAccessor}
	yAccessor={temperatureAccessor}
	label="Vendas"
/> -->
