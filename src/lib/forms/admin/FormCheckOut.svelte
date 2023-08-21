<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { firestore } from '$lib/firebase';
	import type { Pedido, CheckOut, Cliente } from '$lib/firebase-types';
	import { Timestamp, collection, updateDoc, addDoc, DocumentReference } from 'firebase/firestore';

	export let pedidos: Pedido[];

	export let cliente: Cliente;
	const produtos = pedidos.map((pedido) => pedido.produto);
	export let id_cliente: DocumentReference;
	export let id_admin: string;
	let total = 0;
	$: {
		total = 0;
		let sum = 0;
		pedidos.forEach((pedido) => {
			sum += pedido.produto.preco * pedido.quantidade;
		});
		total = sum;
	}
    
    async function checkOut() {
		const checkOut: CheckOut = {
			cliente: cliente,
			produtos: produtos,
			check_in: cliente.created ?? Timestamp.now(),
			check_out: Timestamp.now(),
			id_comanda: id_cliente.id,
			id_admin: id_admin,
			total: total
		};
		console.log(checkOut);
		const check_collection = collection(firestore, `check_out`);
		// const data = {
		// 	created: current_time,
		// 	nome: input.name,
		// 	telefone: input.telefone,
		// 	mesa: input.mesa,
		// 	pagou: false
		// };
		// const clienteColl = await collection(firestore, `clientes`);

		await updateDoc(id_cliente, { pagou: true, mesa: '', comanda_ativa: '' });
		const doc = await addDoc(check_collection, checkOut);
		console.log('check out sucesso');
	}


</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class="bg-primary p-2 rounded-sm">CheckOut</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Tem certeza que deseja realizar o checkout de {cliente.nome}</AlertDialog.Title>
			<AlertDialog.Description>
			Total da comanda: R$ {total}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<Button href="/admin/clientes" on:click={checkOut}>Confirmar</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
