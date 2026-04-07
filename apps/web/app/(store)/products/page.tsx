import type { Metadata } from 'next'
import ProductHero from '@/components/product/ProductHero'
import WardrobeSection from '@/components/product/WardrobeSection'

export const metadata: Metadata = {
  title: 'All Products | Be That Percent',
  description: 'Browse all Be That Percent products.',
}

export default function ProductsPage() {
  return (
    <>
      <ProductHero />
      <WardrobeSection />
    </>
  )
}
