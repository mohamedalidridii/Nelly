import { CollectionConfig } from 'payload/types'



export const QuizSubmissions: CollectionConfig = {
  slug: 'quizSubmissions',
  labels: {
    singular: {
      en: 'Quiz Submitions',
      fr: 'Quiz Reponses'
    },
    plural: {
      en: 'Quiz Submitions',
      fr: 'Quiz Reponses'
    },

  },
  admin: {
    group: 'Quiz',
    description:
      'Reponses Quiz',
    useAsTitle: 'Quiz Submissions',
  },
  fields: [
    {
      name: 'responses',
      label: {
          en: 'Responses',
          fr: 'Réponses'
      },
      type: 'json',
      required: true,
    },
  ]
}