import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Icons } from "./Icons"
import NavItems from "./NavItems"
import { buttonVariants } from "@/components/ui/button"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import ClientAccountNav from "./(AccountNav)/ClientAccountNav"
import Cart from "./Cart"
import AdminAccountNav from "./(AccountNav)/AdminAccountNav"



const NavBar = async () => {

    const nextCookies = cookies()

    const { user } = await getServerSideUser(nextCookies)

    return (
        <div className=" sticky z-50 top-0 inset-x-0 ">
            <header className="relative">
                <MaxWidthWrapper>
                    <div className="relative">

                        <div className="flex h-16 items-center justify-center sm:justify-evenly">
                            <Link href='/'>
                            <img src="/mini.PNG" alt="LOGO" className="relative w-24"/>
                            </Link>
                            {!user ? (<div className="flex flex-1 items-center justify-end space-x-7">
                                <Link className={buttonVariants({
                                    className: 'px-6 py-2 border border-[#ffff] text-white z-50 rounded-lg hover:text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 hover:border-[#FFD700]'
                                })} href='/sign-in'>Se connecter</Link>
                            </div>) : null}
                            <div className="ml-auto flex items-center">
                                <div className=" flex flex-1 items-center justify-end space-x-7">
                                    {user?.role === 'patient' ? (

                                        <div className="flex gap-5">
                                            <ClientAccountNav user={user} />
                                            <Cart />
                                        </div>
                                    ) : null}
                                    {user?.role === 'admin' ? (
                                        <AdminAccountNav user={user} />
                                    ) : null}
                                </div>
                            </div>
                            <div className='ml-4 flow-root lg:ml-6'>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}
export default NavBar