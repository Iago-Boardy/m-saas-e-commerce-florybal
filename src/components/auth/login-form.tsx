'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Eye, EyeOff } from 'lucide-react'

import { LoginSchema } from '../../../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormError } from '@/components/form-error'
import { FormSucess } from '@/components/form-sucess'
import { login } from '../../../actions/login'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [sucess, setSucess] = useState<string | undefined>("")
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSucess("")

    setLoading(true)
    login(values)
    .then((data) => {
      setError(data.error),
      setSucess(data.sucess)
    })
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Aguarda 2 segundos
    setLoading(false)
  } 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='text-3xl'>Login</CardTitle>
          <CardDescription>Entre na sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormSucess message={sucess}/>

            <Button type="submit" className="w-full bg-amber-700" disabled={loading}>
              {loading ? 'Entrando...' : 'Login com Email'}
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
              Login com Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Cadastrar-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}