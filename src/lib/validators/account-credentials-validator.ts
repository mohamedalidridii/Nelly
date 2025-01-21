import { date, z } from 'zod'

export const genre = ['homme',
'femme'
] as const

export const rendezVous = [
  "online",
  "cabinet",
] as const

export const AuthLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
});

export const mappedRdv: { [key in Trdv]: string } = {
  online: "en-ligne",
  cabinet: "cabinet",
}

export const RendezVousValidator = z.object({
  nom: z.string(),
  prenom: z.string(),
  // RendezVous: z.enum(RendezVous),
  date: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: "Invalid date format",
  }).transform((date) => new Date(date).toISOString()),
    RendezVous: z.enum(rendezVous)
})

export const AuthSignupValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
  nom: z.string(),
  prenom: z.string(),
  tel: z.string(),
  genre: z.enum(genre),
});

export type TAuthCredentialsValidator = z.infer<typeof AuthSignupValidator>
export type SAuthCredentialsValidator = z.infer<typeof AuthLoginValidator>
export type TRendezVousValidator = z.infer<typeof RendezVousValidator>
export type Trdv = typeof rendezVous[number]
