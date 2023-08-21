import type { Timestamp } from "firebase/firestore";

export interface Produto {
    id?: string;
    nome: string;
    preco: number;
    categoria: string;
    subcategoria: string;
    descricao?: string;
    vegano: boolean;
    visivel: boolean;
    url?: string;
    ingredientes?: Ingrediente[];
}

export interface Cardapio {
    id?: string;
    produtos: Produto[];
}

export interface Cliente {
    id?: string;
    nome: string;
    telefone: string;
    mesa: string;
    created?: Timestamp;
    waitress?: string;
}


export interface Pedido{
    id?:string;
    created:Timestamp;
    
    cliente:Cliente;
    produto:Produto;

    status:string;
    comanda:string;
    mesa:string;
    observacao:string;
    quantidade:number;
}
// const data = {
//     id: user.user.uid,
//     email: user.user.email,
//     editar_produtos: false,
//     cadastrar_clientes: true,
//     alterar_pedidos: false,
//     controle_estoque: false,
//     editar_permissoes: false
// };
export interface PermsAdmin{
    id:string;
    editar_produtos:boolean;
    cadastrar_clientes:boolean;
    alterar_pedidos:boolean;
    controle_estoque:boolean;
    editar_permissoes:boolean;
    email:string;
    
}


export interface CheckOut{
    id?:string;
    check_out:Timestamp;
    check_in:Timestamp;
    cliente:Cliente;
    produtos:Produto[];
    total:number;
    id_comanda:string;
    id_admin:string;
}


export interface Estoque{
    id?:string;
    items:Ingrediente[];
}

export interface Ingrediente{
    id:string;
    nome:string;
    quantidade:number;
    unidadeMedida:string;
    preco:number;
}