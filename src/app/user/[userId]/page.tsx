
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { cookies } from "next/headers"

interface PageProps {
    params: {
        userId: string
    }
}
const Page = async ({ params }: PageProps) => {
    const { userId } = params
    const payload = await getPayloadClient()
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    const { docs: users } = await payload.find({
        collection: 'users',
        limit: 1,
        where: {
            id: {
                equals: userId,
            },
        },
    })
    const [client] = users
    if (!client) return redirect("/")
    return <>
        <section className="">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mb-8 lg:mb-16">
                    <h2 className="mb-4 text-xl sm:text-2xl tracking-tight font-bold text-gray-900 dark:text-gray-900">Test</h2>
                </div>
            </div>
        </section>
    </>}
    export default Page
