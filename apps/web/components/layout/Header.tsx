'use client';

import Link from 'next/link';
import Nav from './Nav';

// TODO: import useCart from '@/hooks/useCart' and replace stub below
function useCartStub() {
  // Stub — replace with real useCart hook once implemented
  return { itemCount: 0 };
}

export default function Header() {
  // TODO: integrate useCart for live badge count
  const { itemCount } = useCartStub();

  return 
}
