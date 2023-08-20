import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { docStore, userStore } from 'sveltefire';
import type { Cardapio, Cliente } from './firebase-types';
const firebaseConfig = {
	apiKey: 'AIzaSyCU6unky6XBxRi5L48KNI48rhFM6FTiPnw',

	authDomain: 'svelte-cardapio.firebaseapp.com',

	projectId: 'svelte-cardapio',

	storageBucket: 'svelte-cardapio.appspot.com',

	messagingSenderId: '33545716220',

	appId: '1:33545716220:web:0d86fac6faff3cf177f279',

	measurementId: 'G-MLMN7B4FE4'
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const user = userStore(auth);

export const clienteAuthStore = docStore<Cliente>(firestore, 'clientes/1');

export const cardapioStore = docStore<Cardapio>(firestore, 'cardapios/sHs73YG49ZMXJMoeQPzv');

export interface PermsAdmin {
	uid: string;
	email: string;
	editar_produtos: boolean;
	cadastrar_clientes: boolean;
	controle_estoque: boolean;
	editar_permissoes: boolean;
	alterar_pedidos: boolean;
}

// signInAnonymously(auth).then(() => {
//     console.log('logado');
// }).catch((error) => {
//     console.log(error);
// });
