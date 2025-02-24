"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from "zod"
import React, { useState } from 'react';
import { mappedRdv, TRendezVousValidator } from "@/lib/validators/account-credentials-validator"
import { getDay } from "date-fns"
import Datepick from "@/componenets/DatePicker"
import Image from "next/image"



const RendezVous = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TRendezVousValidator>({
        // resolver: zodResolver(RendezVousValidator),
    })
    const router = useRouter()

    // Everything related to Datepicker 
    const [startDate, setStartDate] = useState<Date | null>(null);

    const isWeekday = (date: Date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };
    // -----------------------------------------------------------------------------

    const { mutate, isLoading } = trpc.auth.RendezVous.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("The date is invalid. Please try again")
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }

            toast.error('something went wrong. Please Try again.')
        },
        onSuccess: () => {
            toast.success('Successfully Created')
            router.push('/')
        }

    })

    const handleFormSubmit = (data: TRendezVousValidator) => {
        mutate(data)
    };
    return <>
        <div className="py-6 sm:py-15 lg:pt-5">
        <section className="p-12 text-center">
        <h1 className="text-4xl font-extrabold mb-6">À Propos de Nous</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Bienvenue chez NellyGlam, votre clinique de beauté dédiée à révéler votre éclat naturel. 
          Découvrez notre expertise et nos soins personnalisés pour une expérience luxueuse et apaisante.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
        <div className="group relative overflow-hidden rounded-lg shadow-lg">
          <img src="https://plus.unsplash.com/premium_photo-1661769358914-1d33c22bd7ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Soins du Visage" className="w-full h-80 object-cover transition duration-300 ease-in-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out p-4">
            <h2 className="text-white text-2xl font-bold mb-2">Soins du Visage</h2>
            <p className="text-white text-sm">
              Offrez à votre peau le soin qu&apos;elle mérite avec nos traitements sur mesure, 
              utilisant des produits haut de gamme pour hydrater, purifier et revitaliser votre teint.
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg shadow-lg">
          <img src="https://images.unsplash.com/photo-1731355771317-b2ab72c79124?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Massages et Relaxation" className="w-full h-80 object-cover transition duration-300 ease-in-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out p-4">
            <h2 className="text-white text-2xl font-bold mb-2">Massages et Relaxation</h2>
            <p className="text-white text-sm">
              Plongez dans un univers de sérénité grâce à nos massages personnalisés, 
              conçus pour détendre le corps et l&apos;esprit et éliminer le stress du quotidien.
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg shadow-lg">
          <img src="https://images.unsplash.com/photo-1737215398603-2ef701df8036?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Esthétique Avancée" className="w-full h-80 object-cover transition duration-300 ease-in-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out p-4">
            <h2 className="text-white text-2xl font-bold mb-2">Esthétique Avancée</h2>
            <p className="text-white text-sm">
              Découvrez les dernières technologies en soins esthétiques, 
              incluant le rajeunissement de la peau, les traitements anti-âge et plus encore pour sublimer votre beauté.
            </p>
          </div>
        </div>
      </section>
            <div className="mx-auto max-w-screen-2xl px-5 md:px-5">
                <div className="flex flex-col overflow-hidden rounded-lg bg-stone-200 sm:flex-row">

                    <section>
                        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                                <div className="relative z-10 lg:py-16">
                                    <div className="relative h-64 sm:h-80 lg:h-full">
                                        <Image
                                            width={1000} height={1000}
                                            alt=""
                                            src="https://images.unsplash.com/photo-1598300188904-6287d52746ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="relative flex items-center bg-white">
                                    <span
                                        className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-white"
                                    ></span>

                                    <div className="p-8 sm:p-16 lg:p-24">

                                        <div className="">
                                            <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl font-serif">Espace Rendez-vous</h2>
                                            <p className="mb-8  max-w-md text-gray-400">Vous pouvez fixer votre consultation içi.</p>
                                            <div className="sm:p-2">
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                                            <div className="grid gap-2">
                                                <div className="grid gap-1 py-2">
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
                                                        <Label htmlFor="RendezVous">Type de consultation</Label>
                                                        <select {...register('RendezVous')}>
                                                            {Object.entries(mappedRdv).map(([value, label]) => (
                                                                <option key={value} value={value}>{label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="grid gap-1 py-2">
                                                        <div className="grid gap-1 py-2">
                                                            <Label htmlFor="date">Choisir la date</Label>
                                                            <Controller
                                                                name="date"
                                                                control={control}
                                                                render={({ field }) => <Datepick field={field} />}
                                                            />
                                                            {/* <Datepick {...register('date')} /> */}
                                                        </div>
                                                    </div>
                                                    <Button type="submit" className="bg-teal-800">Prendre un rendez-vous</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </>
}

export default RendezVous