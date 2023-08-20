<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { Cliente } from '$lib/firebase-types';

	export let cliente: Cliente;
    // {pedido.status === 'Entregue'
	// 	? 'bg-green-400'
	// 	: pedido.status === 'Em Preparo'
	// 	? 'bg-yellow-300'
	// 	: pedido.status === 'Cancelado'
	// 	? 'bg-red-400'
	// 	: 'bg-gray-400'}
</script>

<Card.Root
	class=" m-3 transition-all duration-500 delay-100"
>
	<Card.Header>
		<div class="mb-5 text-center text-lg font-bold bg-white rounded-sm">
			{cliente.nome}
			{cliente.mesa}
		</div>
		<Card.Title>
			<div class="flex justify-around">
				<div>
					{cliente.telefone}
				</div>
				
			</div>
		</Card.Title>
		<div class="flex justify-around">
			{cliente.id}
		</div>
	</Card.Header>


	<Card.Footer class="justify-around">
		<p>{cliente.created?.toDate().toLocaleString()}</p>
	</Card.Footer>
</Card.Root>
