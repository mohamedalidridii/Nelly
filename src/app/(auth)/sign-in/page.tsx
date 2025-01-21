"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { AuthLoginValidator, SAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2 } from "lucide-react"
import Image from "next/image"

const Page = () => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const isAgent = searchParams.get('as') === 'Agent'
  const origin = searchParams.get('origin')


  const contiunueAsAgent = () => {
    router.push('?as=Agent')
  }
  const contiunueAsClient = () => {
    router.replace('/sign-in', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SAuthCredentialsValidator>({
    resolver: zodResolver(AuthLoginValidator),
  })


  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
      onSuccess: async () => {

        toast.success('Signed in successfully'),
          router.refresh()

        if (origin) {
          router.push(`/${origin}`)
          return
        }
        if (isAgent) {
          router.push('/admin')
          return
        }
        router.push('/')
      },
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          toast.error('Email ou mot de passe incorrect')
        }
      },
    })
  const onSubmit = ({
    email,
    password,
  }: SAuthCredentialsValidator) => {
    signIn({
      email,
      password,
    })
  }

  return <>
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="font-Amsterdam text-5xl mb-20">Rym Gamra</h1>
          <h1 className="text-3xl font-serif">CONNEXION</h1>
          <Link className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5 text-teal-800'
          })} href='/sign-up'>Si Vous n&apos;avez pas un compte s&apos;inscrire ici . <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
                  className={cn({
                    'focus-visible:ring-red-500':
                      errors.email,
                  })}
                  placeholder='you@example.com'
                />
                {errors?.email && (
                  <p className='text-sm text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='grid gap-1 py-2'>
                <Label htmlFor='password'>Mot de passe</Label>
                <Input
                  {...register('password')}
                  type='password'
                  className={cn({
                    'focus-visible:ring-red-500':
                      errors.password,
                  })}
                  placeholder='Password'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button disabled={isLoading}>
                {isLoading
                  &&
                  (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'
                    />
                  )
                }
                Se connecter
              </Button>
            </div>
          </form>

          {/* <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              or
            </span>
          </div>
          {isAgent ? (
            <Button onClick={contiunueAsClient} variant='secondary' disabled={isLoading}>Connexion Client</Button>) :
            (<Button onClick={contiunueAsAgent} variant='secondary' disabled={isLoading}>Connexion Agent</Button>)} */}
        </div>
      </div>
    </div>
  </>
}
export default Page