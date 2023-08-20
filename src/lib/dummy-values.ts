import { Timestamp } from "firebase/firestore";
import type { Pedido } from "./firebase-types";

const dummyPedido: Pedido = {
    created: Timestamp.now(),
    cliente: {
      nome: 'John Doe',
      telefone: '555-555-5555',
    mesa: 'A1',
    
    },
    produto: {
        nome: 'Product 1',
        preco: 10.99,
        categoria: "",
        subcategoria: "",
        vegano: false,
        visivel: false
    },
    status: 'pending',
    comanda: '123',
    mesa: 'A1',
    observacao: 'No onions',
    quantidade: 2
  };
  
  export { dummyPedido };