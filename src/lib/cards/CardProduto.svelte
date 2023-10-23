<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Produto } from '$lib/firebase-types';

	export let produto: Produto = {
		nome: 'Produto',
		descricao: 'Carne com molho, acompanha pão de sal ou torradas. do produto',
		preco: 420.69,
		categoria: '',
		subcategoria: '',
		vegano: false,
		visivel: false
	};
</script>

<Card.Root class="flex cursor-pointer hover:shadow-lg m-2">
	<img
		class="w-1/2 aspect-square object-cover rounded-l-lg"
		
		src={produto.url ??
			'https://firebasestorage.googleapis.com/v0/b/svelte-cardapio.appspot.com/o/static%2Fno_image.jpg?alt=media&token=cf56867b-39f9-4419-9d6c-aa94d7ce640a' ??
			''}
		alt=""
	/>
	<div class="w-1/2 flex flex-col">
		<Card.Header class="flex-shrink-0 p-3">
			<Card.Title class="font-bold mb-2 mt-3">{produto.nome}</Card.Title>
			<Card.Description
				class="overflow-hidden line-clamp-3 text-justify font-normal text-card-foreground"
				>{produto.descricao}</Card.Description
			>
		</Card.Header>
		<!-- <Card.Content>
            <p>Card Content</p>
        </Card.Content> -->
		<Card.Footer class="flex-grow justify-end align-text-bottom m-0 p-0 pr-3 font-medium">
			R${produto.preco}
		</Card.Footer>
	</div>
</Card.Root>
