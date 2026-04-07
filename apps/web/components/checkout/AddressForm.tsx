'use client';

import { useState, FormEvent } from 'react';

export interface Address {
  fullName: string;
  phoneNumber: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  pinCode: string;
  /** TODO: populate via browser Geolocation API */
  lat?: number;
  lng?: number;
}

interface SavedAddress extends Address {
  id: string;
  label?: string;
}

interface AddressFormProps {
  /** Pre-saved addresses for logged-in users. Empty for guests. */
  savedAddresses?: SavedAddress[];
  onSubmit: (address: Address) => void;
}

const EMPTY_ADDRESS: Address = {
  fullName: '',
  phoneNumber: '',
  line1: '',
  line2: '',
  city: '',
  country: 'India',
  pinCode: '',
};

export default function AddressForm({ savedAddresses = [], onSubmit }: AddressFormProps) {
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);
  const [selectedSavedId, setSelectedSavedId] = useState<string>('');

  function handleChange(field: keyof Address, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSelectSaved(id: string) {
    setSelectedSavedId(id);
    const found = savedAddresses.find((a) => a.id === id);
    if (found) {
      // Spread saved address into form, omitting the id/label keys
      const { id: _id, label: _label, ...rest } = found;
      setForm(rest);
    } else {
      setForm(EMPTY_ADDRESS);
    }
  }

  // TODO: request browser Geolocation and resolve lat/lng via a reverse-geocode API
  // e.g. navigator.geolocation.getCurrentPosition(pos => setForm(f => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude })))
  function handleUseMyLocation() {
    console.log('[AddressForm stub] geolocation not yet implemented');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Saved addresses dropdown — only shown for logged-in users */}
      {savedAddresses.length > 0 && (
        <div>
          <label htmlFor="saved-address" className="mb-1 block text-sm font-medium text-black">
            Use a saved address
          </label>
          <select
            id="saved-address"
            value={selectedSavedId}
            onChange={(e) => handleSelectSaved(e.target.value)}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          >
            <option value="">— Enter a new address —</option>
            {savedAddresses.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label ?? `${a.line1}, ${a.city}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Full name */}
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-black">
          Full Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          autoComplete="name"
          className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-black">
          Phone Number <span aria-hidden="true">*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          required
          value={form.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          autoComplete="tel"
          className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      {/* Address line 1 */}
      <div>
        <label htmlFor="line1" className="mb-1 block text-sm font-medium text-black">
          Address Line 1 <span aria-hidden="true">*</span>
        </label>
        <input
          id="line1"
          type="text"
          required
          value={form.line1}
          onChange={(e) => handleChange('line1', e.target.value)}
          autoComplete="address-line1"
          placeholder="House / Flat / Street"
          className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      {/* Address line 2 */}
      <div>
        <label htmlFor="line2" className="mb-1 block text-sm font-medium text-black">
          Address Line 2
        </label>
        <input
          id="line2"
          type="text"
          value={form.line2}
          onChange={(e) => handleChange('line2', e.target.value)}
          autoComplete="address-line2"
          placeholder="Landmark / Area (optional)"
          className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      {/* City + Pin in a row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium text-black">
            City <span aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            type="text"
            required
            value={form.city}
            onChange={(e) => handleChange('city', e.target.value)}
            autoComplete="address-level2"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="pinCode" className="mb-1 block text-sm font-medium text-black">
            PIN Code <span aria-hidden="true">*</span>
          </label>
          <input
            id="pinCode"
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]{6}"
            value={form.pinCode}
            onChange={(e) => handleChange('pinCode', e.target.value)}
            autoComplete="postal-code"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="mb-1 block text-sm font-medium text-black">
          Country <span aria-hidden="true">*</span>
        </label>
        <input
          id="country"
          type="text"
          required
          value={form.country}
          onChange={(e) => handleChange('country', e.target.value)}
          autoComplete="country-name"
          className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>

      {/* Geolocation helper */}
      <button
        type="button"
        onClick={handleUseMyLocation}
        className="text-xs text-blue-600 underline hover:text-blue-800 focus:outline-none"
      >
        Use my current location
        {/* TODO: resolve address from coordinates and pre-fill fields */}
      </button>

      <button
        type="submit"
        className="w-full rounded bg-black py-3 text-sm font-semibold text-white hover:bg-neutral-800"
      >
        Save &amp; Continue
      </button>
    </form>
  );
}
