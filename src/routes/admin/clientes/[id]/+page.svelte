<script lang="ts">
	import CardCliente from '$lib/cards/admin/CardCliente.svelte';
	import type { PageData } from './$types';

	import * as Table from '$lib/components/ui/table';
	import { Collection, collectionStore, docStore } from 'sveltefire';

	import { collection, doc, query, where } from 'firebase/firestore';
	import { clienteAuthStore, firestore, user } from '$lib/firebase';
	import type { Cliente, Pedido } from '$lib/firebase-types';
	import FormCheckOut from '$lib/forms/admin/FormCheckOut.svelte';
	import QRcode from '$lib/QRcode.svelte';
	// import QRcodeAlert from '$lib/QRcodeAlert.svelte';

	export let data: PageData;

	const clienteId = data.identificador;
	const cliente = docStore<Cliente>(firestore, 'clientes/' + clienteId);
	const pediRef = collection(firestore, 'pedidos');
	//@ts-ignore
	const q = query<Pedido>(pediRef, where('comanda', '==', data.identificador));
	const pediStore = collectionStore<Pedido>(firestore, q);

	$: pedidosEntregues = $pediStore.filter((pedido) => pedido.status == 'Entregue');
	$: pedidosPendentes = $pediStore.filter(
		(pedido) => pedido.status == 'Pendente' || pedido.status == 'Em Preparo'
	);

	$: pedidosCancelados = $pediStore.filter((pedido) => pedido.status == 'Cancelado');

	let total = 0;
	$: {
		total = 0;
		let sum = 0;
		pedidosEntregues.forEach((pedido) => {
			sum += pedido.produto.preco * pedido.quantidade;
		});
		total = sum;
	}

	$:linkcliente = `/cliente/${clienteId}/cardapio`;
</script>

<main class="flex flex-col">
	{#if $cliente}
		<div class="flex justify-evenly">
			<CardCliente cliente={$cliente} />
			{#if $cliente && $user?.email && cliente.ref}
				<FormCheckOut
					pedidos={pedidosEntregues}
					id_admin={$user?.email}
					cliente={$cliente}
					id_cliente={cliente.ref}
				/>
				<QRcode value={`https://cafedavillla.com/cliente/${cliente.ref.id}/cardapio`}>abrir qr code</QRcode>

				<a href={`/cliente/${cliente.id}/cardapio`} target="_blank" class="text-white bg-black">abrir cardapio</a>
				{/if}
		</div>
	{/if}
	{#if pedidosEntregues.length > 0}
		<p class="m-3 p-2 text-center text-lg text-white mt-10 bg-slate-700 rounded-sm">
			Pedidos Entregues
		</p>

		<Table.Root class="bg-card">
			<Table.Header>
				<Table.Row>
					<Table.Head class="">Produto</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Quant</Table.Head>
					<Table.Head class="text-right">Total:R${total.toFixed(2)}</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each pedidosEntregues as pedido, i (pedido.id)}
					<!-- content here -->
					<Table.Row>
						<Table.Cell class="font-medium">{pedido.produto.nome}</Table.Cell>
						<Table.Cell>{pedido.status}</Table.Cell>
						<Table.Cell>{pedido.quantidade}</Table.Cell>
						<Table.Cell class="text-right">{pedido.produto.preco}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}

	{#if pedidosPendentes.length > 0}
		<p class="m-3 p-2 text-center text-lg text-white mt-10 bg-slate-700 rounded-sm">
			Pedidos Pendentes
		</p>

		<Table.Root class="bg-card">
			<Table.Header>
				<Table.Row>
					<Table.Head class="">Produto</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Quant</Table.Head>
					<Table.Head class="text-right">Preco</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each pedidosPendentes as pedido, i (pedido.id)}
					<!-- content here -->
					<Table.Row
						class={pedido.status === 'Entregue'
							? 'bg-green-400'
							: pedido.status === 'Em Preparo'
							? 'bg-yellow-300'
							: pedido.status === 'Cancelado'
							? 'bg-red-400'
							: 'bg-gray-400'}
					>
						<Table.Cell class="font-medium">{pedido.produto.nome}</Table.Cell>
						<Table.Cell>{pedido.status}</Table.Cell>
						<Table.Cell>{pedido.quantidade}</Table.Cell>
						<Table.Cell class="text-right">{pedido.produto.preco}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
</main>
