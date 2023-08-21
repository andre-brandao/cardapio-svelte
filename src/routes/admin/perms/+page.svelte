<script lang="ts">
	import { collectionStore } from 'sveltefire';
	import type { PageData } from './$types';
	import { firestore } from '$lib/firebase';
	import type { PermsAdmin } from '$lib/firebase-types';
	import * as Table from '$lib/components/ui/table';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { doc, updateDoc } from 'firebase/firestore';
	import FormEditarPerms from '$lib/forms/admin/FormEditarPerms.svelte';

	async function updatePerms(id: string, perms: PermsAdmin) {
		
        
        console.log("update");
        console.log(id);
        
        //@ts-ignore
		
        
        await updateDoc(doc(firestore, 'admin_permission', id), perms);
	}
	const permStore = collectionStore<PermsAdmin>(firestore, `admin_permission`);
	$: perms = $permStore;
</script>

<Table.Root class="bg-card">
	<Table.Header>
		<Table.Row>
			<Table.Head class="">email</Table.Head>
			<Table.Head>Editar Produtos</Table.Head>
			<Table.Head>Controle Estoque</Table.Head>
			<Table.Head class="text-right">Alterar Pedidos</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each perms as perm, i (perm.id)}
			<!-- content here -->

			<FormEditarPerms {perm} id={perm.id}/>

		{/each}
	</Table.Body>
</Table.Root>
