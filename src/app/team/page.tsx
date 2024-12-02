'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface Developer {
  name: string
  role: string
  github: string
  linkedin: string
  image?: string
}

const initialDevelopers: Developer[] = [
  {
    name: "Gabriel G. Machado",
    role: "Desenvolvedor Full Stack",
    github: "GabrielGMachado",
    linkedin: "https://www.linkedin.com/in/gabrielgmachado-199a06312/"
  },
  {
    name: "Iago Boardman Padilha",
    role: "Desenvolvedor Front end",
    github: "Iago-Boardy",
    linkedin: "https://www.linkedin.com/in/iago-boardman-padilha-057aab285/"
  }
]

async function getGithubProfileImage(username: string): Promise<string> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`)
    if (!res.ok) throw new Error('Failed to fetch GitHub profile')
    const data = await res.json()
    return data.avatar_url
  } catch (error) {
    console.error(`Error fetching GitHub profile for ${username}:`, error)
    return '/placeholder.svg?height=400&width=400'
  }
}

export default function TeamPage() {
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers)

  useEffect(() => {
    const fetchImages = async () => {
      const updatedDevelopers = await Promise.all(
        initialDevelopers.map(async (dev) => ({
          ...dev,
          image: await getGithubProfileImage(dev.github)
        }))
      )
      setDevelopers(updatedDevelopers)
    }

    fetchImages()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Nossa Equipe</h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Conheça os desenvolvedores por trás deste projeto, apaixonados por criar soluções inovadoras e experiências excepcionais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {developers.map((dev) => (
            <Card key={dev.name} className="bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-300 transition-colors">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-200">
                  <Image
                    src={dev.image || '/placeholder.svg?height=400&width=400'}
                    alt={`Foto de perfil de ${dev.name}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-amber-900">{dev.name}</CardTitle>
                <CardDescription className="text-amber-700">{dev.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-amber-50 border-amber-300"
                    onClick={() => window.open(dev.linkedin, '_blank')}
                  >
                    <Linkedin className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="sr-only">LinkedIn de {dev.name}</span>
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-amber-50 border-amber-300"
                    onClick={() => window.open(`https://github.com/${dev.github}`, '_blank')}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    <span className="sr-only">GitHub de {dev.name}</span>
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
