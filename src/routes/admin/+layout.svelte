<script lang="ts">
	import AnimatedRoute from '$lib/AnimatedRoute.svelte';
	import Login from '$lib/Login.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { auth, firestore, user } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
    import { page } from '$app/stores';
	import { docStore } from 'sveltefire';
	import type { PermsAdmin } from '$lib/firebase-types';
	import { collection, query, where } from 'firebase/firestore';

   
	// const admin_perm_query = query(collection(firestore,'admin_permission'), where('uid', '==', $user.uid));
    // export const adminPerm = docStore<PermsAdmin>(admin_perm_query);

    // import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

{#if $user}
	<div class="flex justify-between">
		<img
			class="p-2 w-64 h-auto rounded-lg filter invert"
			src="https://firebasestorage.googleapis.com/v0/b/svelte-cardapio.appspot.com/o/static%2Flogo-h-p.png?alt=media&token=a129a507-20ad-4b9e-887f-d7da1e831155"
			alt=""
        />
      
	</div>
    
<nav class="bg-muted rounded-sm m-3 p-2 flex items-center space-x-4  lg:space-x-6">
	<a
		href="/admin/clientes"
		class="{$page.route.id == '/admin/clientes'
        ? 'bg-background text-white'
        : ' bg-muted text-muted-foreground'} rounded-md px-1 font-bold transition-colors hover:text-primary"
	>
		Comandas
	</a>

	<a
		href="/admin/produtos"
		class="{$page.route.id == '/admin/produtos'
        ? 'bg-background text-white'
        : ' bg-muted text-muted-foreground'} rounded-md p-1 font-bold transition-colors hover:text-primary"
	>
		Produtos
	</a>
	<a
		href="/admin/ultimospedidos"
		class="{$page.route.id == '/admin/ultimospedidos'
        ? 'bg-background text-white'
        : ' bg-muted text-muted-foreground'} rounded-md px-1 font-bold transition-colors hover:text-primary"
	>
		Ultimos Pedidos
	</a>
	<a
		href="/amin/estoque"
		class="{$page.route.id == '/admin/estoque'
        ? 'bg-background text-white'
        : ' bg-muted text-muted-foreground'} rounded-md px-1 font-bold transition-colors hover:text-primary"
	>
		Estoque
	</a>

    <Button class="" on:click={() => signOut(auth)}>Sair</Button>
    
</nav>
	<AnimatedRoute>
		<slot />
	</AnimatedRoute>
{:else}
	<Login />
{/if}
