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
        <div className=" sticky z-50 top-0 inset-x-0 h-30">
            <header className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">

                        <div className="flex h-16 items-center justify-between sm:justify-evenly ">
                            <Link href='/'>
                                <h1 className="font-Amsterdam text-black text-2xl">Rym Gamra</h1>
                            </Link>

                            {!user ? (<div className="flex flex-1 items-center justify-end space-x-7">
                                <Link className={buttonVariants({
                                    className: 'gap-1.5 bg-teal-800 hover:bg-teal-600'
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