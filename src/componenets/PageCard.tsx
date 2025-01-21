import { CardRDV } from "./CardRDV"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import Link from "next/link"
import Image from "next/image"


const PageCard = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)
    return <>
        {user?.role == "patient" || user?.role == "admin" ?
            (<div>
                <CardRDV />
            </div>) : (<div>
                <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="my-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
                        <div className="sm:text-left lg:text-left">
                            <h1 className="text-5xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-5xl sm:text-center lg:text-left">
                                <span className="block xl:inline font-serif">Votre allié pour un</span> <br />
                                <span className="block text-teal-800 xl:inline font-serif">Bien-être durable.</span>
                            </h1>
                            <p
                                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ">
                                Inscrivez-vous dès aujourd&apos;hui à une consultation gratuite et découvrez comment Rym Gamra peut vous aider à transformer votre vie.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link href="/sign-up"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-teal-600 md:py-4 md:text-lg md:px-10">
                                        S&apos;inscrire
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link href="/sign-in"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                        Se connecter
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
                            <Image width={1000} height={1000} className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1505624198937-c704aff72608?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                    </div>
                </section>
            </div>)}
    </>
}
export default PageCard