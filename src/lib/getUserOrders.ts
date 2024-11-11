// lib/db.ts
import { db } from "@/lib/db"  // Ajuste o caminho se necessário

export async function getUserOrders(userId: string) {
  return await db.order.findMany({
    where: {
      userId,  // Filtra os pedidos pelo ID do usuário
    },
    include: {
      product: true,  // Inclui os detalhes do produto relacionado ao pedido
    },
    orderBy: {
      createdAt: 'desc',  // Ordena os pedidos pela data de criação, do mais recente ao mais antigo
    },
  })
}
