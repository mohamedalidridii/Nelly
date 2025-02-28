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
import React, { useEffect, useState } from 'react';
import { mappedRdv, TRendezVousValidator } from "@/lib/validators/account-credentials-validator"
import { getDay } from "date-fns"
import Datepick from "@/componenets/DatePicker"
import Image from "next/image"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger);

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
        <div className="">

            <div className="mx-auto max-w-screen-2xl px-5 md:px-5 form-section">
                <div className="flex flex-col overflow-hidden rounded-lg border border-yellow-200 sm:flex-row">
                    <section>
                        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                                <div className="relative z-10 lg:py-16 image-section">
                                    <div className="relative h-64 sm:h-80 lg:h-full">
                                        <Image
                                            width={1000} height={1000}
                                            alt=""
                                            src="/neila.jpg"
                                            className=" absolute inset-0 object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="relative flex items-center">
                                    <span
                                        className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 "
                                    ></span>

                                    <div className="p-8 sm:p-16 lg:p-24">

                                        <div className="">
                                            <h2 className="mb-4 text-xl  text-white md:text-2xl lg:text-3xl font-serif">Espace Rendez-vous</h2>
                                            <p className="mb-8  text-md max-w-md text-gray-200">Vous pouvez fixer votre consultation içi.</p>
                                            <div className="sm:p-2">
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                                            <div className="grid gap-2">
                                                <div className="grid gap-1 py-2">
                                                    <div className="flex gap-3">
                                                        <div className="grid gap-1 py-2">
                                                            <div className="flex ">
                                                                <Label htmlFor="nom" className="text-white pb-3">Nom</Label>
                                                            </div>
                                                            <Input {...register("nom")}
                                                                className={cn({
                                                                    "focus-visible:ring-red-500": true
                                                                })}
                                                                placeholder="Nom"
                                                            /></div>
                                                        <div className="grid gap-1 py-2">
                                                            <div className="flex ">
                                                                <Label htmlFor="prenom" className="text-white pb-3">Prenom</Label>
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
                                                        <Label htmlFor="RendezVous" className="text-white pb-3">Type de consultation</Label>
                                                        <select {...register('RendezVous')}>
                                                            {Object.entries(mappedRdv).map(([value, label]) => (
                                                                <option key={value} value={value}>{label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="grid gap-1 py-2">
                                                        <div className="grid gap-1 py-2">
                                                            <Label htmlFor="date" className="text-white pb-3">Choisir la date</Label>
                                                            <Controller
                                                                name="date"
                                                                control={control}
                                                                render={({ field }) => <Datepick field={field} />}
                                                            />
                                                            {/* <Datepick {...register('date')} /> */}
                                                        </div>
                                                    </div>
                                                    <Button type="submit" className="px-6 py-2 font-semibold border border-[#ffff] text-white z-50 rounded-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 hover:border-[#FFD700]">Prendre un rendez-vous</Button>
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