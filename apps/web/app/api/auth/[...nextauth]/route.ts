// TODO: install next-auth — run: npm install next-auth
// TODO: install a Twilio Verify SDK or similar — run: npm install twilio
// TODO: configure NEXTAUTH_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID in .env.local

/**
 * app/api/auth/[...nextauth]/route.ts
 * NextAuth OTP authentication via phone number.
 *
 * Setup steps:
 *  1. npm install next-auth
 *  2. Create lib/auth.ts with the NextAuth config (see below)
 *  3. Set NEXTAUTH_SECRET, NEXTAUTH_URL in .env.local
 *  4. Configure a phone OTP provider using Twilio Verify or a custom Credentials provider
 *
 * Example lib/auth.ts (uncomment after installing next-auth):
 *
 * import NextAuth from 'next-auth'
 * import CredentialsProvider from 'next-auth/providers/credentials'
 * import twilio from 'twilio'
 *
 * const twilioClient = twilio(
 *   process.env.TWILIO_ACCOUNT_SID!,
 *   process.env.TWILIO_AUTH_TOKEN!
 * )
 *
 * export const authOptions = {
 *   providers: [
 *     CredentialsProvider({
 *       id: 'phone-otp',
 *       name: 'Phone OTP',
 *       credentials: {
 *         phoneNumber: { label: 'Phone Number', type: 'text' },
 *         otp: { label: 'OTP', type: 'text' },
 *       },
 *       async authorize(credentials) {
 *         const { phoneNumber, otp } = credentials ?? {}
 *         if (!phoneNumber || !otp) return null
 *
 *         // Verify OTP via Twilio Verify
 *         const verification = await twilioClient.verify.v2
 *           .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
 *           .verificationChecks.create({ to: phoneNumber, code: otp })
 *
 *         if (verification.status !== 'approved') return null
 *
 *         // TODO: getOrCreateUser by phone — import { getUserByPhone, createUser } from '@/lib/db/schema/users.firestore'
 *         // let user = await getUserByPhone(phoneNumber)
 *         // if (!user) user = await createUser({ phoneNumber, name: '', email: '', addresses: [] })
 *         // return { id: user.id!, name: user.name, email: user.email }
 *         return null
 *       },
 *     }),
 *   ],
 *   session: { strategy: 'jwt' as const },
 *   secret: process.env.NEXTAUTH_SECRET,
 *   callbacks: {
 *     async jwt({ token, user }: { token: Record<string, unknown>; user?: { id: string } }) {
 *       if (user) token.userId = user.id
 *       return token
 *     },
 *     async session({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) {
 *       if (session.user) (session.user as Record<string, unknown>).id = token.userId
 *       return session
 *     },
 *   },
 * }
 *
 * export const { handlers: { GET, POST }, auth } = NextAuth(authOptions)
 */

// TODO: once next-auth is installed, replace this file with:
// export { GET, POST } from '@/lib/auth'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { error: 'next-auth not yet configured. TODO: npm install next-auth and configure lib/auth.ts' },
    { status: 501 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: 'next-auth not yet configured. TODO: npm install next-auth and configure lib/auth.ts' },
    { status: 501 }
  )
}
