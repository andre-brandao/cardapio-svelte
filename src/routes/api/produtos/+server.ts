import { cardapioStore, firestore } from '$lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { Produto } from '$lib/firebase-types';

export async function GET({ setHeaders }) {
	const year = 60 * 60 * 24 * 365;

	// https://vercel.com/docs/edge-network/caching#cdn-cache-control
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Cache-Control': `public, s-maxage=${year}`,
		'CDN-Cache-Control': `public, s-maxage=${year}`,
		'Vercel-CDN-Cache-Control': `public, s-maxage=${year}`
	});

	const produtos = await getDoc(doc(firestore, 'cardapios/sHs73YG49ZMXJMoeQPzv'));
    let produtoArray: Produto[] =[]
    produtos.exists()
    if (produtos.exists()) {
        
        produtos.data().produtos.forEach((produto: Produto) => {
            produtoArray = [...produtoArray, produto]
        })
        return json(produtoArray);
    }
    else {
        return json({erro: 'Cardápio não encontrado'})
    }
}
