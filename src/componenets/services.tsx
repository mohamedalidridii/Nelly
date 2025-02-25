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
        <div className="py-6 sm:py-15 lg:pt-5">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md">
                <img src="https://via.placeholder.com/300" alt="Refresh" className="w-full h-auto mb-4"/>
                <h2 className="text-lg font-bold">REFRESH</h2>
                <p className="text-sm text-gray-600">Conception Cerbères</p>
            </div>

            <div className="bg-white p-6 shadow-md">
                <img src="https://via.placeholder.com/300" alt="Sharp" className="w-full h-auto mb-4"/>
                <h2 className="text-lg font-bold">SHARP</h2>
                <p className="text-sm text-gray-600">Conception Harpies</p>
            </div>

            <div className="bg-white p-6 shadow-md">
                <img src="https://via.placeholder.com/300" alt="Carve" className="w-full h-auto mb-4"/>
                <h2 className="text-lg font-bold">CARVE</h2>
                <p className="text-sm text-gray-600">Conception Golems</p>
            </div>
        </section>


        </div>
    </>
}

export default RendezVous