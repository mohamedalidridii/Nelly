"use client"

import { Icons } from "@/componenets/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { AuthSignupValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import React, { useState } from 'react';

interface Car {
    brand: string;
}




const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthSignupValidator),
    })

    const router = useRouter()

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("this email is already in use. sign in instead?")
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }

            toast.error('something went wrong. Please Try again.')
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`Verification email sent to ${sentToEmail}.`)
            router.push('/verify-client?to=' + sentToEmail)
        }
    })
    const onSubmit = ({
        email,
        password, nom, prenom, tel, genre
    }: TAuthCredentialsValidator) => {
        mutate({
            email,
            password, nom, prenom, tel, genre,
        })
    }


    return <>
        <div className="container relative flex pt-5 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="font-Amsterdam text-4xl mb-20">Rym Gamra</h1>
                    <h1 className="text-2xl font-serif">Créer un compte</h1>
                    <Link className={buttonVariants({
                        variant: 'link',
                        className: 'gap-1.5 '
                    })} href='/sign-in'>Avez-vous déjà un compte ? Connectez-vous. <ArrowRight className="h-4 w-4" /></Link>
                </div>

                <div className="grid gap-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="email">Email</Label>
                                </div>
                                <Input
                                    {...register('email')}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email,
                                    })}
                                    placeholder="vous@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="nom">Nom</Label>
                                    </div>
                                    <Input {...register("nom")}
                                        className={cn({
                                            "focus-visible:ring-red-500": true
                                        })}
                                        placeholder="Nom"
                                    /></div>
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="prenom">Prenom</Label>
                                    </div>
                                    <Input {...register("prenom")}
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.prenom,
                                        })}
                                        placeholder="Prenom"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="tel">Numero de telephone</Label>
                                </div>
                                <Input {...register("tel")} className={cn({
                                    "focus-visible:ring-red-500": errors.tel
                                })}
                                    placeholder="Numero Tel"
                                />
                            </div>

                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="password">Mot de passe</Label>
                                    </div>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.password
                                        })}
                                        placeholder="Mot de passe"
                                    />


                                    {errors?.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>)}
                                </div>
                                <Button>Créer</Button>
                            </div>

                    </form>
                </div>

            </div>
        </div>

    </>
}
export default Page