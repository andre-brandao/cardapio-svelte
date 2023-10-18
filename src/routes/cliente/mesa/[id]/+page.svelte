<script lang="ts">
	import type { PageData } from './$types';
	import { collectionStore } from 'sveltefire';
	import { firestore } from '$lib/firebase';
	import type { Cliente } from '$lib/firebase-types';
	import { query, where, collection } from 'firebase/firestore';
	import Loading from '$lib/Loading.svelte';
	import * as Card from '$lib/components/ui/card';
	import { text } from '@sveltejs/kit';
	export let data: PageData;
	const identificador: string = data.identificador;

	// all clientes that have mesa = identificador
	const colientRef = collection(firestore, 'clientes');
	const q = query(colientRef, where('mesa', '==', identificador));
	//@ts-ignore
	const clientes = collectionStore<Cliente>(firestore, q);
	$: console.log($clientes);
</script>

<Card.Root class="m-4">
	<Card.Header class="text-center">
		<Card.Title>{data.identificador}</Card.Title>
	</Card.Header>
</Card.Root>
<a href={`/cardapio`}>
   
    <Card.Root class="m-4 bg-transparent text-white">
        <Card.Header class="text-center">
            <Card.Title>Cardapio</Card.Title>
        </Card.Header>
    </Card.Root>
</a>

{#if $clientes}
	<div class="text-center font-bold">Faça seu Pedido:</div>
	{#each $clientes as cliente}
		<a href={`/cliente/${cliente.id}/cardapio`}>
			<Card.Root class="m-2">
				<Card.Header class="text-center">
					<Card.Title>{cliente.nome}</Card.Title>
					<Card.Description>{cliente.waitress}</Card.Description>
				</Card.Header>
			</Card.Root>
		</a>
	{/each}
{:else}
<!-- QR code invalido -->
<Loading />
{/if}
