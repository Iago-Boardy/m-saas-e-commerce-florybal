import ProductForm from "@/components/ProductForm";
import { db } from "@/lib/db";

export default async function NewProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({where: {id}})
  return (
    <>
      <ProductForm product={product}/>
    </>
  );
}