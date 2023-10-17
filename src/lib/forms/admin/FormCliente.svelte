<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
	import { writable } from 'svelte/store';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';

	import { maskify } from 'svelte-maskify';

	function generateUid(): string {
		const timestamp = new Date().getTime().toString();
		// const random = Math.random().toString(36).substring(2); // Generate a random alphanumeric string
		return timestamp;
	}

	let dfCliente = {
		nome: '',
		mesa: '',
		pagou: false,
		telefone: ''
	};

	async function cadastrar_cliente() {
		// current time in firebase timestamp format
		// const firebase_time
		const current_time = serverTimestamp();
		const clientes = collection(firestore, `clientes`);
		// const data = {
		// 	created: current_time,
		// 	nome: input.name,
		// 	telefone: input.telefone,
		// 	mesa: input.mesa,
		// 	pagou: false
		// };

		const doc = await addDoc(clientes, $formData);
		console.log('Cliente adicionado com sucesso');
		console.log(doc);
	}

	const formDefaults = {
		// id: generateUid(),
		created: serverTimestamp(),
		nome: dfCliente.nome,
		mesa: dfCliente.mesa,
		telefone: dfCliente.telefone,
		comanda_ativa: generateUid()
	};

	const formData = writable(formDefaults);

	$: {
		console.log($formData.mesa);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bg-card">
		<Dialog.Header>
			<Dialog.Title>Cadastrar Nova Comanda</Dialog.Title>
			<Dialog.Description>
				Preencha os campos abaixo para cadastrar uma nova Comanda.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="name">Nome</Label>
				<Input
					id="name"
					bind:value={$formData.nome}
					class="col-span-3 bg-accent"
					placeholder="Arquiteclinio"
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="mesa">Mesa</Label>
				<Input
					id="mesa"
					bind:value={$formData.mesa}
					class="col-span-3 bg-accent"
					placeholder="Chale 1"
				/>
			</div>
			<!-- 
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="mesa">Quarto</Label>

				<Select.Root >
					<Select.Trigger class="col-span-3 bg-accent">
						<Select.Value placeholder="Selecione um Quarto" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="Suite 1">Suite 1</Select.Item>
                        <Select.Item value="Suite 2">Suite 2</Select.Item>
						<Select.Item value="Chale 1">Chale 1</Select.Item>

					</Select.Content>
                    <Select.Input name={$formData.mesa}/>
				</Select.Root>
			</div> -->

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right" for="telefone">Telefone</Label>
				<input
					type="tel"
					id="telefone"
					bind:value={$formData.telefone}
					class="col-span-3 bg-accent flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="(31) 98765-4321"
					use:maskify={'(99) 99999-9999'}
				/>
				<!-- <Input
					type="tel"
					id="telefone"
					bind:value={$formData.telefone}
					class="col-span-3 bg-accent"
					placeholder="(31) 98765-4321"
				/> -->
			</div>
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				on:click={() => {
					cadastrar_cliente();
					// console.log(action);
				}}>Save changes</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
