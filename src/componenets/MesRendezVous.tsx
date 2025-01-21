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
import { mappedRdv, rendezVous, RendezVousValidator, TRendezVousValidator } from "@/lib/validators/account-credentials-validator"
import DatePicker from "react-datepicker"
import { getDay } from "date-fns"
import Datepick from "@/componenets/DatePicker"
import Image from "next/image"



const RendezVous = () => {

    return <>

    </>
}

export default RendezVous