<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { Pedido } from '$lib/firebase-types';

	export let pedido: Pedido;
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
				OBS: {pedido.observacao}
			</div>
		</Card.Description>
	</Card.Header>
	<div class="mb-5 text-center text-lg font-bold rounded-sm">
		{pedido.status}
	</div>
	<Card.Content>
		<div class="flex justify-evenly">
			<Button
				class="font-bold cursor-pointer flex items-center space-x-2 bg-green-500  rounded-2xl p-3"
				>Entregue</Button
			>
			<Button
				class="font-bold  cursor-pointer flex items-center space-x-2 bg-yellow-500 rounded-2xl p-3"
				on:click={() => {
					// updateStatus('Em Preparo', pedido.id);
				}}>Preparando</Button
			>

			<Button
				class="font-bold  cursor-pointer flex items-center space-x-2 bg-red-500 rounded-2xl p-3"
				>Cancelado</Button
			>
		</div>
	</Card.Content>
	<Card.Footer class="justify-around">
		<p>{pedido.created.toDate().toLocaleString()}</p>
	</Card.Footer>
</Card.Root>
