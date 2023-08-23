import { initializeApp } from 'firebase/app';
import { collection, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { collectionStore, docStore, userStore } from 'sveltefire';
import type { Cardapio, Cliente, Estoque, Pedido } from './firebase-types';
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

export const estoqueStore = docStore<Estoque>(firestore, 'estoque/tdbPcjuGT28D34MYzDvc');

const pediRef = collection(firestore, 'pedidos');
//@ts-ignore
const q = query<Pedido>(pediRef, orderBy('created'));
export const pedidosStore = collectionStore<Pedido>(firestore, q);