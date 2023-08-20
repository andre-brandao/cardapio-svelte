import type { LayoutServerLoad } from './$types';

export const load = (async ({params}) => {
    const identificador = params.id;;
    return {
        identificador
    };
}) satisfies LayoutServerLoad;