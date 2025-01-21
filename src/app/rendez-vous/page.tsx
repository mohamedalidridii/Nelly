import React, { useEffect, useState } from 'react';

import RendezVous from "@/componenets/rendezVous"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import { redirect } from 'next/navigation';


const Page = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)
    return <MaxWidthWrapper>
        {user?.role == "admin" ? (
            <RendezVous/>
        ): redirect('/sign-in')} 
        
    </MaxWidthWrapper>
}

export default Page