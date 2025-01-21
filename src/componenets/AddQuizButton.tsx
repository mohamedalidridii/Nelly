'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useQuiz } from '@/hooks/use-quiz'
import { Quiz } from '@/cms-types'
import { useRouter, useSearchParams } from "next/navigation"

const AddQuizButton = ({
  quiz,
}: {
  quiz: Quiz
}) => {
  const router = useRouter()

  const { addItem } = useQuiz()
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
        addItem(quiz)
        setIsSuccess(true)
        router.push(`/quiz/${quiz.id + 1}`)
      }}
      size='lg'
      className='max-w-max'>
      {isSuccess ? 'Chargement' : 'Suivant'}
    </Button>
  )
}

export default AddQuizButton