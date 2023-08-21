<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Ingreditente } from '$lib/firebase-types';

	export let ingrediente: Ingreditente = {
		id: '',
		nome: 'Produto',
		quantidade: 0,
		unidadeMedida: '',
		preco: 420.69
	};
</script>

<Card.Root class="flex cursor-pointer hover:shadow-lg m-2">
	<div class="w-1/2 flex flex-col">
		<Card.Header class="flex-shrink-0 p-3">
			<Card.Title class="font-bold mb-2 mt-3">{ingrediente.nome}</Card.Title>
			<Card.Description
				class="overflow-hidden line-clamp-3 text-justify font-normal text-card-foreground"
			>
				{ingrediente.preco} por {ingrediente.unidadeMedida}
			</Card.Description>
		</Card.Header>
		<!-- <Card.Content>
            <p>Card Content</p>
        </Card.Content> -->
		<Card.Footer class="flex-grow justify-end align-text-bottom m-0 p-0 pr-3 font-medium">
			{ingrediente.quantidade}
			{ingrediente.unidadeMedida}
		</Card.Footer>
	</div>
</Card.Root>
