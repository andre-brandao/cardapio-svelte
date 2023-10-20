<script lang="ts">
	import AnimatedRoute from '$lib/AnimatedRoute.svelte';
	import Login from '$lib/Login.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { auth, firestore, storage, user } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { page } from '$app/stores';
	import { Doc, FirebaseApp, docStore } from 'sveltefire';
	import type { PermsAdmin } from '$lib/firebase-types';
	import { collection, doc, query, where } from 'firebase/firestore';
	import { getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	
	// const permStore = docStore(firestore, `admin_permission/${$user!.uid}`);
	
	// onMount(async () => {

	// 	if ($user) {
		
			
	// 		if($page.route.id == '/admin/clientes' && $permStore.cadastrar_clientes == false){
	// 			redirect(300,'/access-denied');
	// 			console.log(page);
	// 		}
	// 		if ($page.route.id == '/admin/produtos' && $permStore.editar_produtos == false) {
	// 			redirect(300,'/access-denied');
	// 			console.log(page);
	// 		}
	// 		if ($page.route.id == '/admin/estoque' && $permStore.controle_estoque == false) {
	// 			redirect(300,'/access-denied');
	// 			console.log(page);
	// 		}
	// 		if ($page.route.id == '/admin/ultimospedidos' && $permStore.alterar_pedidos == false) {
	// 			redirect(300,'/access-denied');
	// 			console.log(page);
	// 		}
	// 		if ($page.route.id == '/admin/perms' && $permStore.editar_permissoes == false) {
	// 			redirect(300,'/access-denied');
	// 			console.log(page);
	// 		}
			
	// 	}
	// });


</script>

<FirebaseApp {firestore} {auth} {storage}>
	{#if $user}
		<Doc ref={`admin_permission/${$user.uid}`} let:data>
			<div class="flex justify-between">
				<img
					class="p-2 w-64 h-auto rounded-lg filter invert"
					src="https://firebasestorage.googleapis.com/v0/b/svelte-cardapio.appspot.com/o/static%2Flogo-h-p.png?alt=media&token=a129a507-20ad-4b9e-887f-d7da1e831155"
					alt=""
				/>
			</div>

			<nav class="bg-muted rounded-sm m-3 p-2 flex items-center  overflow-auto space-x-4 lg:space-x-6">
				{#if data?.cadastrar_clientes}
					<a
						href="/admin/clientes"
						class="{$page.route.id == '/admin/clientes'
							? 'bg-background text-white p-1'
							: ' bg-muted text-muted-foreground'} rounded-sm px-1 font-bold transition-colors hover:text-primary"
					>
						Comandas
					</a>
				{/if}
				{#if data?.editar_produtos}
					<a
						href="/admin/produtos"
						class="{$page.route.id == '/admin/produtos'
							? 'bg-background text-white p-1'
							: ' bg-muted text-muted-foreground'} rounded-sm p-1 font-bold transition-colors hover:text-primary"
					>
						Produtos
					</a>
				{/if}

				{#if data?.alterar_pedidos}
					<a
						href="/admin/ultimospedidos"
						class="{$page.route.id == '/admin/ultimospedidos'
							? 'bg-background text-white p-1'
							: ' bg-muted text-muted-foreground'} rounded-sm px-1 font-bold transition-colors hover:text-primary"
					>
						Ultimos Pedidos
					</a>
				{/if}
				{#if data?.controle_estoque}
					<a
						href="/admin/estoque"
						class="{$page.route.id == '/admin/estoque'
							? 'bg-background text-white p-1'
							: ' bg-muted text-muted-foreground'} rounded-sm px-1 font-bold transition-colors hover:text-primary"
					>
						Estoque
					</a>
				{/if}
				{#if data?.editar_permissoes}
					<a
						href="/admin/perms"
						class="{$page.route.id == '/admin/perms'
							? 'bg-background text-white p-1'
							: ' bg-muted text-muted-foreground'} rounded-sm px-1 font-bold transition-colors hover:text-primary"
					>
						Permissoes Funcionarios
					</a>
				{/if}
				<a
				href="/admin/quartos"
				class="{$page.route.id == '/admin/quartos'
					? 'bg-background text-white p-1'
					: ' bg-muted text-muted-foreground'} rounded-sm px-1 font-bold transition-colors hover:text-primary"
			>
				Quartos
			</a>
				<Button class="" on:click={() => signOut(auth)}>Sair</Button>
			</nav>
			<AnimatedRoute>
				<slot />
			</AnimatedRoute>
		</Doc>
	{:else}
		<Login />
	{/if}
</FirebaseApp>
