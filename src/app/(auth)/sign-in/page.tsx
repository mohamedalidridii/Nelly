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
          <Image src="/Nelly.jpg" width={100} height={100} alt="image" className="w-36 h-100  rounded-lg shadow-lg "/>
          <h1 className="text-4xl font-bold text-center mb-8 text-white">CONNEXION</h1>
          <Link className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5 text-white'
          })} href='/sign-up'>Si Vous n&apos;avez pas un compte s&apos;inscrire ici . <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="grid gap-6 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-5'>
                <Label htmlFor='email' className="text-white pb-3">Email:</Label>
                <Input
                  {...register('email')}
                  className={cn({
                    'border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-white':
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
                <Label htmlFor='password' className="text-white pb-3">Mot de passe:</Label>
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

              <Button disabled={isLoading}
              className="px-6 py-2 border border-[#ffff] text-white z-50 rounded-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 hover:border-[#FFD700]">
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

        </div>
      </div>
    </div>
  </>
}
export default Page