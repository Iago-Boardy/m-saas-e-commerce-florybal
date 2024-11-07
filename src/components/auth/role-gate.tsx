"use client"

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../../hooks/use-current-role";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !==allowedRole) {
    return (
      <h1>OOps, you shouldn't be here</h1>
    )
  }

  return (
    <>
    {children}
    </>
  )
}