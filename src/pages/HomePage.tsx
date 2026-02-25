import Hero from '../components/Hero'
import BestSellers from '../components/BestSellers'
import Categories from '../components/Categories'
import PromoBanner from '../components/PromoBanner'
import NewProducts from '../components/NewProducts'
import EverythingYouNeed from '../components/EverythingYouNeed'
import PeptideProducts from '../components/PeptideProducts'
import Transparency from '../components/Transparency'
import StorageTips from '../components/StorageTips'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <Categories />
      <PromoBanner />
      <NewProducts />
      <EverythingYouNeed />
      <PeptideProducts />
      <Transparency />
      <StorageTips />
    </>
  )
}
