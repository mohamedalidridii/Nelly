import React, { useEffect, useState } from 'react';

import RendezVous from "@/componenets/rendezVous"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import { redirect } from 'next/navigation';
import Service from '@/componenets/service';


const Page = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)
    return <MaxWidthWrapper>
            <Service/>
        
    </MaxWidthWrapper>
}

export default Page