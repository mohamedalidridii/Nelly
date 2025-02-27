import AddToCartButton from '@/componenets/AddToCartButton'
import ImageSlider from '@/componenets/ImageSlider'
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper'
import ProductReel from '@/componenets/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Protocols', href: '/protocols'},
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products

  if (!product) return notFound()

  

  return (
    <MaxWidthWrapper className='bg-PrimaryColor'>
      <div>

      </div>
    </MaxWidthWrapper>
  )
}

export default Page