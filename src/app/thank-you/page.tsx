import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product, ProductFile, User } from '@/cms-types'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '@/componenets/PaymentStatus'


  return (
    
  )
}

export default ThankYouPage