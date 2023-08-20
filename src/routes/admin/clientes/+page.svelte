<script lang="ts">
	import FormCliente from './../../../lib/forms/admin/FormCliente.svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { firestore } from '$lib/firebase';
	import { collection, query, where } from 'firebase/firestore';
    import type { Cliente } from '$lib/firebase-types';
	import CardCliente from '$lib/cards/admin/CardCliente.svelte';
	import { collectionStore } from 'sveltefire';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Input } from '$lib/components/ui/input';
	// export let data: PageData;

	let today = new Date();
	today.setDate(today.getDate() - 1);
	today.setHours(0, 0, 0, 0);
	const pediRef = collection(firestore, 'clientes');
	//@ts-ignore
	const q = query<Cliente>(pediRef, where('mesa', '!=', ''));
	const clientes = collectionStore<Cliente>(firestore, q);
	$: clientesFiltrados = $clientes.filter((cliente) => {
		return (
			cliente.nome.toLowerCase().includes(barra_pesquisa.toLowerCase()) ||
			cliente.mesa.toLowerCase().includes(barra_pesquisa.toLowerCase())
		);
	});
	// $: mesas = new Set($clientes.map((cliente) => cliente.mesa));
	let barra_pesquisa = '';
</script>
<main>
    <div class="flex flex-row items-center gap-3">


        <FormCliente>
            <Button class="ml-1">+ Cadastrar Cliente</Button>
        </FormCliente>
        <div class="grid grid-cols-4 items-center">
            <Label class="font-bold">Pesquisar:</Label>
            <Input
                id="name"
                bind:value={barra_pesquisa}
                class="col-span-3 bg-accent"
                placeholder="Nome/Mesa"
            />
        </div>
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
	
		{#each $clientes ?? [] as cliente}
			<a href={`/admin/clientes/${cliente.id}`}>
				<CardCliente {cliente} />
			</a>
		{/each}
	</div>

</main>
