import { cardapioStore } from '$lib/firebase';
import { getDoc } from 'firebase/firestore';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const year = 60 * 60 * 24 * 365;

	// https://vercel.com/docs/edge-network/caching#cdn-cache-control
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Cache-Control': `public, s-maxage=${year}`,
		'CDN-Cache-Control': `public, s-maxage=${year}`,
		'Vercel-CDN-Cache-Control': `public, s-maxage=${year}`
	});
	if (cardapioStore.ref) {
		const produtos = await getDoc(cardapioStore.ref);
		return json(produtos);
	}else{
        return json({error: "Cardapio não encontrado"});
    }
}
