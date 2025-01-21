import { AuthLoginValidator, AuthSignupValidator, RendezVousValidator } from '../lib/validators/account-credentials-validator'
import { publicProcedure, router } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthSignupValidator)
    .mutation(async ({ input }) => {
      const { email, password, genre, nom, prenom, tel } = input
      const payload = await getPayloadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'patient',
          genre, nom, prenom, tel,
        },
      })

      return { success: true, sentToEmail: email }
    }),

  RendezVous: publicProcedure
    .input(RendezVousValidator)
    .mutation(async ({ input }) => {
      const { nom, prenom, date, RendezVous } = input
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'rendezVous',
        data: {
          nom,
          prenom,
          date, RendezVous
        },
      })

      return { success: true }
    }),
    quiz: publicProcedure
    .input(z.object({
      responses: z.array(
        z.object({
          question: z.string(),
          response: z.any(),
        })
      ),
    }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      try {
        await payload.create({
          collection: "quizSubmissions",
          data: {
            responses: input.responses,
          },
        });
        return { success: true };
      } catch (error) {
        console.error('Server mutation error:', error); // Log the error for debugging
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while submitting the quiz.",
        });
      }
    }),
    verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  signIn: publicProcedure
    .input(AuthLoginValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})