import { formatCurrency } from "@/lib/formatters"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { Star } from "lucide-react"

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
  rating?: number
}

export default function ProductCard({ id, name, priceInCents, description, imagePath, rating = 5 }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col bg-white rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="relative w-full h-48 mb-2">
        <Image src={imagePath} alt={name} fill className="object-cover rounded-t-3xl" />
        <div className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatCurrency(priceInCents / 100)}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-amber-900">{name}</CardTitle>
        <CardDescription className="flex items-center mt-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-amber-700 text-sm">({rating}.0)</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="line-clamp-2 text-amber-800">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition duration-300 text-sm font-semibold">
          <Link href={`/products/${id}`}>
            Comprar Agora
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}