<script lang="ts">
    // import type { PageData } from './$types';
    // export let data: PageData;

	import CardProduto from "$lib/cards/CardProduto.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { cardapioStore } from "$lib/firebase";

    $: produtos = $cardapioStore?.produtos ?? [];
    let barra_pesquisa = "";
</script>


<main class="flex flex-col">
	<div class="sticky top-0 z-10 p-2 bg-background">
		<div class="flex flex-row items-center gap-3">
				<Button class="ml-1 bg-secondary text-secondary-foreground hover:bg-blue-300">
					+ Cadastrar Produto
				</Button>
			<div class="grid grid-cols-4 items-center">
				<Label class="font-bold">Pesquisar:</Label>
				<Input
					id="name"
					bind:value={barra_pesquisa}
					class="col-span-3 bg-accent text-primary"
					placeholder="Produtos/Descrição/Categoria"
				/>
			</div>
			
		</div>
	</div>

    
    <div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {#each produtos as produto}
            <CardProduto {produto} />
        {/each}
    </div>

</main>
