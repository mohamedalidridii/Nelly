"use client"

import React from "react";
import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";

interface VerifyEmailProps {
    token: string;
}

      const VerifyEmail = ({ token }: VerifyEmailProps) => {
        const { data, isLoading, isError } =
          trpc.auth.verifyEmail.useQuery({
            token,
          })
      
        if (isError) {
          return (
            <div className='flex flex-col items-center gap-2'>
              <XCircle className='h-8 w-8 text-red-600' />
              <h3 className='font-semibold text-xl'>
                There was a problem
              </h3>
              <p className='text-muted-foreground text-sm'>
                This token is not valid or might be expired.
                Please try again.
              </p>
            </div>
          )
        }
        if(data){
          return (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                <Image src='/email-sent.png' fill alt="The email was sent"/>
              </div>
              <h3 className="font-semibold text-2x1">
                The Client is verified Successfuly
              </h3>
            </div>
          )
        }
        if (isLoading) {
          return (
            <div className='flex flex-col items-center gap-5'>
              <Loader2 className='animate-spin h-15 w-15 text-zinc-600' />
              <h3 className='font-semibold text-xl'>
                Verifying...
              </h3>
              <p className='text-muted-foreground text-sm'>
                Our team is working on the verification
              </p>
            </div>
          )
        }
    
    }


export default VerifyEmail
