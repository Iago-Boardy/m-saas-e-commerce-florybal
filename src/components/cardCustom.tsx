import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type ProductCardProps = {
  id: string,
  name: string,
  priceInCents: number,
  description: string,
  imagePath: string,
}

export default function ProductCard({ id, name, priceInCents, description, imagePath}: 
  ProductCardProps) {
    return (
      <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-[150px] mb-2">
          <Image src={imagePath} alt={name} fill/>
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-4">{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 text-[14px] text-white px-6 py-3 rounded-full hover:bg-amber-700 transition duration-300">
            <Link href={`/products/${id}/purchase`}>Comprar</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }