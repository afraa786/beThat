'use client'

// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
// TODO: import { useAuth } from '@/hooks/useAuth'

import { useEffect, useState } from 'react'

// ─── Placeholder Types (move to @/types/user.ts) ─────────────────────────────
type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
type UsualSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

type UserProfile = {
  uid: string
  fullName: string
  email: string
  phoneNumber?: string
  dateOfBirth?: string   // ISO date string: YYYY-MM-DD
  gender?: Gender
  usualSize?: UsualSize  // used for size recommendations on product pages
  createdAt?: string
}

// ─── Stub — replace with real Firestore call ──────────────────────────────────
async function fetchUserProfile(_uid: string): Promise<UserProfile | null> {
  // TODO: const snap = await getDoc(doc(db, 'users', uid))
  // TODO: if (!snap.exists()) return null
  // TODO: return { uid: snap.id, ...snap.data() } as UserProfile
  return null
}

async function updateUserProfile(_uid: string, _data: Partial<UserProfile>): Promise<void> {
  // TODO: await updateDoc(doc(db, 'users', uid), {
  //         ...data,
  //         updatedAt: serverTimestamp(),
  //       })
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  // TODO: const { user, loading: authLoading } = useAuth()
  // TODO: Redirect to /login if !user and !authLoading

  const [profile, setProfile] = useState<Partial<UserProfile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      // TODO: Replace 'stub-uid' with user.uid from useAuth()
      const data = await fetchUserProfile('stub-uid')
      if (data) setProfile(data)
      setLoading(false)
    }
    load()
  }, [])

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      // TODO: Replace 'stub-uid' with user.uid from useAuth()
      await updateUserProfile('stub-uid', {
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender as Gender,
        usualSize: profile.usualSize as UsualSize,
      })
      setSuccessMessage('Profile updated successfully.')
    } catch {
      setErrorMessage('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-1/3" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-neutral-200 rounded w-1/4" />
              <div className="h-9 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-black mb-8">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={profile.fullName ?? ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Priya Sharma"
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Email (read-only — managed by Firebase Auth) */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
            Email <span className="text-gray-400">(cannot be changed here)</span>
          </label>
          <input
            id="email"
            type="email"
            value={profile.email ?? ''}
            readOnly
            disabled
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm bg-neutral-50 text-gray-400 cursor-not-allowed"
          />
          {/* TODO: Add "Change email" flow via Firebase Auth updateEmail + re-authentication */}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            value={profile.phoneNumber ?? ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            value={profile.dateOfBirth ?? ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          {/* TODO: Use DOB for birthday discount emails — trigger via Cloud Function */}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
          <select
            id="gender"
            value={profile.gender ?? ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        {/* Usual Size */}
        <div>
          <label htmlFor="usualSize" className="block text-xs font-medium text-gray-600 mb-1">
            Usual Size <span className="text-gray-400">(used for size recommendations)</span>
          </label>
          <select
            id="usualSize"
            value={profile.usualSize ?? ''}
            onChange={(e) => handleChange('usualSize', e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="" disabled>Select size</option>
            {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as UsualSize[]).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Feedback messages */}
        {successMessage && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>

        {/* TODO: Add "Delete Account" option with confirmation modal */}
        {/* TODO: Add "Change Password" option via Firebase Auth sendPasswordResetEmail */}
      </form>
    </div>
  )
}
