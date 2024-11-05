'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Eye, EyeOff } from 'lucide-react'

import { RegisterSchema } from '../../../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormError } from '@/components/form-error'
import { FormSucess } from '@/components/form-sucess'
import { register } from '../../../actions/register'

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    setLoading(true)
    register(values)
    .then((data) => {
      setError(data.error)
      setSuccess(data.sucess)
    })
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
    setLoading(false)
  } 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='text-3xl'>Criar uma Conta</CardTitle>
          <CardDescription>Crie sua nova conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="...."
                  {...form.register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <FormError message={error}/>
            <FormSucess message={success}/>

            <Button type="submit" className="w-full bg-amber-700" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Cadastrar com Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Fazer login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}