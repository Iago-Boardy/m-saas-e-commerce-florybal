import Image from "next/image";

export default function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">{product.name}</h3>
          <p className="text-amber-600 font-bold">{product.price}</p>
          <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    )
  }