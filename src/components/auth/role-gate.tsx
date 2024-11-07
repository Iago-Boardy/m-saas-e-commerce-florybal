"use client"

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../../hooks/use-current-role";
import Link from "next/link";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <>
        <h1>Oops, you shouldn't be here</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-700 transition-colors">
          Go back to Home Page
        </Link>
      </>
    );
  }
  

  return (
    <>
    {children}
    </>
  )
}