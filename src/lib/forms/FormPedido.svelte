<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { firestore } from '$lib/firebase';
	import type { Cliente, Produto } from '$lib/firebase-types';
	import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
    export let id = '';
    export let cliente:Cliente;

	export let produto: Produto = {
		id: '',
		nome: '',
		categoria: '',
		descricao: '',
		preco: 0,
		subcategoria: '',
		vegano: false,
		visivel: true
	};

	async function novo_pedido() {
		const current_time = serverTimestamp();

		const pedidoColle = collection(firestore, `pedidos`);

	if (cliente) {
			const data = {
				produto: produto,
				cliente: cliente,
				comanda: id,
				mesa: cliente.mesa,
				created: current_time,
				observacao: obsInpt,
				status: 'Pendente',
				quantidade: 1
			};

			const docume = await addDoc(pedidoColle, data);
			console.log('Pedido criado sucesso');
			console.log(current_time);
		} else {
			console.log('Cliente nao encontrado');
			alert('Cliente nao encontrado');
		}
	}

	let obsInpt: string = '';
	let quantInput: number = 1;
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<slot />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{produto.nome}</AlertDialog.Title>
			<AlertDialog.Description>
				{produto.descricao}
			</AlertDialog.Description>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="obs" class="text-right">Observação</Label>

				<Textarea
					id="obs"
					class="col-span-3 bg-accent"
					placeholder="Observações, orientações, etc..."
					bind:value={obsInpt}
				/>
			</div>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button on:click={novo_pedido}>Continuar</Button>
			<!-- <AlertDialog.Action on:click={novo_pedido}>Continue</AlertDialog.Action> -->
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
