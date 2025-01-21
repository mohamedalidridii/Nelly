
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
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { CardRDV } from "@/componenets/CardRDV"
import { FlipTitle } from "@/componenets/FlipTitle"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import PageCard from "@/componenets/PageCard"

export default function Home () {

    return <>
    <PageCard />
        </>
}
