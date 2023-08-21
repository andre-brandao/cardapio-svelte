<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';
	import * as Table from '$lib/components/ui/table';
	import { firestore } from '$lib/firebase';
	import type { PermsAdmin } from '$lib/firebase-types';
	import { doc, updateDoc } from 'firebase/firestore';
	export let id: string;
    export let perm: PermsAdmin;

 
	/**
	 * Updates the permissions of an admin user in Firestore.
	 * @param {string} id - The ID of the admin user.
	 * @param {PermsAdmin} perm - An object containing the updated permissions.
	 * @returns {void}
	 */
	function updatePerms(id: string, perm: PermsAdmin) {
		updateDoc(doc(firestore, 'admin_permission', id), {
			editar_produtos: perm.editar_produtos,
			controle_estoque: perm.controle_estoque,
			alterar_pedidos: perm.alterar_pedidos
		});
		console.log('update');
		
	}

	$:{
		updatePerms(id, perm);
	}
</script>

<Table.Row>
	<Table.Cell class="font-medium">{perm.email}</Table.Cell>
	<Table.Cell>
		<Switch bind:checked={perm.editar_produtos} />
	</Table.Cell>

	<Table.Cell>
		<Switch bind:checked={perm.controle_estoque}/>
	</Table.Cell>
	<Table.Cell class="text-right">
		<Switch bind:checked={perm.alterar_pedidos} />
	</Table.Cell>
</Table.Row>
