'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/cms-types'

const AddToCartButton = ({
  product,
}: {
  product: Product
}) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full bg-teal-800 hover:bg-teal-600'>
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton