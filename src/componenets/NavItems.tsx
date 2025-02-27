"use client"
import { PRODUCT_CATEGORIES } from "@/config"

import { useState, useRef, useEffect } from "react"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import ClientAccountNav from "./(AccountNav)/ClientAccountNav"

const NavItems = () => {
    const [activeIndex, setActiveIndex]= useState<
    null | number
    >(null)

    useEffect(()=>{
        const handler = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                setActiveIndex(null)
            }
        }
        document.addEventListener("keydown", handler)
        return () => {
            document.removeEventListener("keydown", handler)
        }
    })

    const isAnyOpen = activeIndex !==null

    const navRef = useRef <HTMLDivElement | null>(null)

    useOnClickOutside(navRef, () => setActiveIndex(null))


    return <div className="flex gap-4 h-full border border-yellow-200 rounded-lg" ref={navRef}>

            
    </div>
        
    

}
export default NavItems