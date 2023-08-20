import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    const identificador = params.id;
    return {
        identificador
    };
}) satisfies PageServerLoad;