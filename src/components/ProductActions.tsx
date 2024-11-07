'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct, toggleProductAvailability } from "@/app/admin/_actions/product";

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return ( 
    <DropdownMenuItem
      disabled={isPending}
      onSelect={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase)
          router.refresh()
        })
      }}
    >
      {isAvailableForPurchase ? "Desativar" : "Ativar"}
    </DropdownMenuItem>
  )
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return ( 
    <DropdownMenuItem
      disabled={disabled || isPending}
      onSelect={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}