<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { auth } from '$lib/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';
	import { document } from 'postcss';
	import type { PermsAdmin } from './firebase-types';

	async function addPerms(id: string, perms: PermsAdmin) {
		// await addDoc(collection(firestore, 'admin_permission/'), perms);
		await setDoc(doc(firestore, 'admin_permission', id), perms);
	}

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		const data = {
			id: user.user.uid,
			email: user.user.email?? "",
			editar_produtos: false,
			cadastrar_clientes: false,
			alterar_pedidos: false,
			controle_estoque: false,
			editar_permissoes: false
		};

		if (user.user.metadata.creationTime === user.user.metadata.lastSignInTime) {
            console.log(user.user.metadata.creationTime);
            console.log(user.user.metadata.lastSignInTime);
            
            addPerms(user.user.uid, data);
            console.log('new user');
        
        }

		console.log(user);
	}
</script>

<div class="flex justify-center items-center h-screen">
	<Button on:click={signInWithGoogle}>Sign in with Google</Button>
</div>
