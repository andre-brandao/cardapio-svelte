import type { PageServerLoad } from './$types';
function getIdString(id: string): string {
    const idMap = new Map<string, string>([
      ['QGRo1', 'Quarto 1'],
      ['QVRc2', 'Quarto 2'],
      ['Q81s3', 'Quarto 3'],
      ['C9Zt1', 'Chale 1'],
      ['C1Zt2', 'Chale 2'],
      ['C2Zt3', 'Chale 3'],
      ['C3Zt4', 'Chale 4'],
    ]);
    
    return idMap.get(id) || 'Invalid ID';
  }
export const load = (async ({params}) => {
    const identificador = getIdString(params.id);
    return {
        identificador
    };
}) satisfies PageServerLoad;