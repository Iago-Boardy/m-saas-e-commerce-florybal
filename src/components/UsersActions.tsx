'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/admin/_actions/users";

export function DeleteDropdownUsersItem({ id }: { id: string,}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return ( 
    <DropdownMenuItem
      onSelect={() => {
        startTransition(async () => {
          await deleteUser(id)
          router.refresh()
        })
      }}
    >
      Deletar
    </DropdownMenuItem>
  )
}