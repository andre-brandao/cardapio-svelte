<script lang="ts">
	import { page } from '$app/stores';
	import { docStore } from 'sveltefire';
	import type { LayoutData } from './$types';
	import { clienteAuthStore, firestore } from '$lib/firebase';
	import type { Cliente } from '$lib/firebase-types';
	import Loading from '$lib/Loading.svelte';
	import AnimatedRoute from '$lib/AnimatedRoute.svelte';

	export let data: LayoutData;
	$: console.log($page);

	const cliente = docStore<Cliente>(firestore, 'clientes/' + data.identificador);
</script>

<div class="flex justify-between">
	<img
		class="p-2 w-64 h-auto rounded-lg filter invert"
		src="https://firebasestorage.googleapis.com/v0/b/svelte-cardapio.appspot.com/o/static%2Flogo-h-p.png?alt=media&token=a129a507-20ad-4b9e-887f-d7da1e831155"
		alt=""
	/>

	<p class="mr-5 mt-7">Ola,{$cliente?.nome}</p>
</div>

{#if $cliente}
	<!-- content here -->

	<nav
		class="fixed bottom-0 left-0 right-0 bg-muted flex justify-around items-center h-16 shadow-md z-10"
	>
		<a
			class="{$page.route.id === '/cliente/[id]/pedidos'
				? 'bg-background text-white  font-bold'
				: 'bg-[url(static/logo.svg)] text-background font-bold'} p-2 rounded-sm"
			href="/cliente/{data.identificador}/pedidos"
		>
			Pedidos
		</a>

		<a
			class="{$page.route.id === '/cliente/[id]/cardapio'
				? 'bg-background text-white font-bold'
				: 'bg-[url(static/logo.svg)] text-background font-bold'} p-2 rounded-sm"
			href="/cliente/{data.identificador}/cardapio"
		>
			Cardapio
		</a>
	</nav>

	<AnimatedRoute>
		<slot {cliente}/>
	</AnimatedRoute>
{:else}
	<!-- else content here -->
	<Loading />
{/if}
