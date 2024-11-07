"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
import { addProduct, updateProduct } from "@/app/admin/_actions/product"

export default function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product ? updateProduct.bind(null, product.id) : addProduct,
    {}
  )
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 lg:px-8 px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">
          {product ? "Editar Produto" : "Adicionar Produto"}
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" name="name" defaultValue={product?.name || ""} />
                {error.name && <div className="text-destructive text-sm">{error.name}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceInCents">Preço (em centavos)</Label>
                <Input
                  type="number"
                  id="priceInCents"
                  name="priceInCents"
                  value={priceInCents}
                  onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
                />
                <div className="text-sm text-muted-foreground">
                  {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && <div className="text-destructive text-sm">{error.priceInCents}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" name="description" defaultValue={product?.description || ""} />
                {error.description && <div className="text-destructive text-sm">{error.description}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagem</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {product?.imagePath && (
                  <div className="mt-2">
                    <Image 
                      src={product.imagePath} 
                      height={200} 
                      width={200} 
                      alt="Imagem do produto" 
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
                {error.image && <div className="text-destructive text-sm">{error.image}</div>}
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar"}
    </Button>
  )
}