<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { firestore, user } from '$lib/firebase';
	import type { Pedido } from '$lib/firebase-types';
	import { Timestamp, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	export let pedido: Pedido;
	export let id: string;

	function updateStatus(status: string, id: string) {
		console.log(status, id);

		if (id == '' || id == undefined) {
			alert('id vazio');
			return;
		}
		if ($user == null) {
			alert('usuário não logado');
			return;
		}
		const userID = $user.email;
		const pedidoRef = doc(firestore, 'pedidos', id);
		updateDoc(pedidoRef, { status: status, entregador: userID, edit_time: serverTimestamp() });
	}
</script>

<Card.Root
	class="{pedido.status === 'Entregue'
		? 'bg-green-400'
		: pedido.status === 'Em Preparo'
		? 'bg-yellow-300'
		: pedido.status === 'Cancelado'
		? 'bg-red-400'
		: 'bg-gray-400'} m-3 transition-all duration-500 delay-100"
>
	<Card.Header>
		<div class="mb-5 text-center text-lg font-bold bg-white rounded-sm">
			{pedido.cliente.nome}
			{pedido.mesa}
		</div>
		<Card.Title>
			<div class="flex justify-around">
				<div>
					{pedido.produto.nome}
				</div>
			</div>
		</Card.Title>
		<div>
			ID: {pedido.id}
		</div>
		<Card.Description>
			<div>
				<p>
					OBS: {pedido.observacao}
				</p>
				{#if pedido.entregador}
					<p>
						entregador:{pedido.entregador}
					</p>
				{/if}
				{#if pedido.edit_time}
					<p>
						alterado:{pedido.edit_time?.toDate()}
					</p>
				{/if}
			</div>
		</Card.Description>
	</Card.Header>
	<div class="mb-5 text-center text-lg font-bold rounded-sm">
		{pedido.status}
	</div>
	<Card.Content>
		<div class="flex justify-evenly">
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button
						class="font-bold cursor-pointer flex items-center space-x-2 bg-green-500  rounded-2xl p-3"
						>Entregue</Button
					></AlertDialog.Trigger
				>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Essa ação não pode ser desfeita, você tem certeza?</AlertDialog.Title
						>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete your account and remove
							your data from our servers.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<Button
							on:click={() => {
								console.log('click');

								updateStatus('Entregue', id);
							}}
						>
							Continuar
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<Button
				class="font-bold  cursor-pointer flex items-center space-x-2 bg-yellow-500 rounded-2xl p-3"
				on:click={() => {
					updateStatus('Em Preparo', id);
				}}>Preparando</Button
			>

			<Button
				class="font-bold  cursor-pointer flex items-center space-x-2 bg-red-500 rounded-2xl p-3"
				on:click={() => {
					updateStatus('Cancelado', id);
				}}>Cancelado</Button
			>
		</div>
	</Card.Content>
	<Card.Footer class="justify-around">
		<p>{pedido.created.toDate().toLocaleString()}</p>
	</Card.Footer>
</Card.Root>
