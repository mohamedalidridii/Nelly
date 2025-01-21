import { PrimaryActionEmailHtml } from '../componenets/emails/PrimaryActionEmail'
import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Quiz: CollectionConfig = {
  
  slug: "quiz",
  labels: {
      singular: {
          en: 'Quiz',
          fr: 'Quiz'
      },
      plural: {
          en: 'Quiz',
          fr: 'Quiz'
      }
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    useAsTitle: 'Quiz',
    group: 'Quiz',
  },

  fields: [
    {
      name: 'type',
      label: 'type de question',
      defaultValue: 'select',
      required: true,
      type: 'select',
      options: [
          { value: 'select', label: 'Select' },
          { value: 'multiSelect', label: 'Multi-Select' },
          { value: 'text', label: 'Text' },
      ],
  },
  {
    name: 'question',
    label: 'Poser une question',
    required: true,
    type: 'text',
},
{
    name: 'option1',
    required: false,
    type: 'text',
    label: 'Option 1',
},
{
    name: 'option2',
    required: false,
    type: 'text',
    label: 'Option 2',
},
{
    name: 'option3',
    required: false,
    type: 'text',
    label: 'Option 3',
},
{
    name: 'option4',
    required: false,
    type: 'text',
    label: 'Option 4',
},
{
    name: 'option5',
    required: false,
    type: 'text',
    label: 'Option 5',
},
{
    name: 'option6',
    required: false,
    type: 'text',
    label: 'Option 6',
},
{
    name: 'option7',
    required: false,
    type: 'text',
    label: 'Option 7',
},
{
    name: 'option8',
    required: false,
    type: 'text',
    label: 'Option 8',
},
{
    name: 'option9',
    required: false,
    type: 'text',
    label: 'Option 9',
},
{
    name: 'option10',
    required: false,
    type: 'text',
    label: 'Option 10',
},
{
    name: 'option11',
    required: false,
    type: 'text',
    label: 'Option 11',
},
{
    name: 'option12',
    required: false,
    type: 'text',
    label: 'Option 12',
},
{
    name: 'option13',
    required: false,
    type: 'text',
    label: 'Option 13',
},
{
    name: 'option14',
    required: false,
    type: 'text',
    label: 'Option 14',
},
{
    name: 'option15',
    required: false,
    type: 'text',
    label: 'Option 15',
},
{
    name: 'option16',
    required: false,
    type: 'text',
    label: 'Option 16',
},
{
    name: 'option17',
    required: false,
    type: 'text',
    label: 'Option 17',
},
{
    name: 'option18',
    required: false,
    type: 'text',
    label: 'Option 18',
},
{
    name: 'option19',
    required: false,
    type: 'text',
    label: 'Option 19',
},
{
    name: 'option20',
    required: false,
    type: 'text',
    label: 'Option 20',
},
  ],
}