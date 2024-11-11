'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Shield, LogOut } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Perfil() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleLogout = () => {
    signOut() // Chamando o signOut para deslogar
  }

  const userName = session?.user?.name || 'Usuário'
  const firstLetter = userName.charAt(0).toUpperCase() // Primeira letra do nome

  return (
    <div className="min-h-screen from-amber-50 to-amber-100 mt-20">
      <main className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Picture & Info */}
            <div className="flex flex-col items-center">
              <Card className=" overflow-hidden">
                <CardContent className="p-0">
                  <Avatar className="w-48 h-48 text-amber-800 bg-amber-200 flex items-center justify-center text-4xl font-bold">
                    {firstLetter}
                  </Avatar>
                </CardContent>
              </Card>
              <h1 className="text-4xl font-bold text-amber-900 mt-4">{userName}</h1>
              <p className="text-amber-700 text-xl mt-1">{session?.user?.email}</p>

              <div className='flex gap-3'>
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-2 text-amber-600 hover:bg-amber-100"
                  onClick={handleEditClick}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-2 text-amber-600 hover:bg-amber-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="col-span-2">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                  <TabsTrigger value="profile" className="text-amber-900">Perfil</TabsTrigger>
                  <TabsTrigger value="security" className="text-amber-900">Segurança</TabsTrigger>
                </TabsList>

                {/* Profile Tab Content */}
                <TabsContent value="profile" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-amber-900 text-xl">Informações de Perfil</h2>
                      <p className="text-amber-800 mt-2">Alterar suas informações pessoais como nome, email, e imagem de perfil.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab Content */}
                <TabsContent value="security" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-amber-900 text-xl">Segurança</h2>
                      <p className="text-amber-800 mt-2">Gerenciar suas configurações de segurança como senha e autenticação de dois fatores.</p>
                      <div className="flex items-center space-x-2 text-amber-700 mt-4">
                        <Shield className="h-5 w-5" />
                        <span>Alterar senha</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Alert if user is not logged in */}
      {!session && (
        <Alert>
          <AlertDescription>
            Faça login para acessar seu perfil e configurações.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
