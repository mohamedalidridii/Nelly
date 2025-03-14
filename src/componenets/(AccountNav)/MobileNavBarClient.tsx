'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from "@/cms-types"
import { useAuth } from "@/hooks/user-auth"
import { DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenu, 
  DropdownMenuSeparator, } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
const MobileNavClient = ({user}: {user: User}) => {
  function capitalizeFirstLetter(str: string): string {
        
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

const {signOut} = useAuth()
    
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild className="overflow-visible sm:invisible">
        <Button variant="ghost" size="sm" className="relative">Mon compte</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white w-60 " align="end">
        <div className="flex items-center justify-center gap-5 p-2">
            <div className="flex flex-col space-y-0.5 leading-none gap-2">
                <Badge variant="outline" className="flex justify-center">{`${user.nom} ${user.prenom}`}</Badge>
                <Badge className="flex justify-center">{capitalizeFirstLetter(user.role)}</Badge>
            </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href={`/user/${user.id}`}>Mon profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
            Déconnexion
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
  )
}

export default MobileNavClient