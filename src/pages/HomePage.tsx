import Hero from '../components/Hero'
import BestSellers from '../components/BestSellers'
import Categories from '../components/Categories'
import NewProducts from '../components/NewProducts'
import EverythingYouNeed from '../components/EverythingYouNeed'
import PeptideProducts from '../components/PeptideProducts'
import StorageTips from '../components/StorageTips'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <Categories />
      <NewProducts />
      <EverythingYouNeed />
      <PeptideProducts />
      <StorageTips />
    </>
  )
}
