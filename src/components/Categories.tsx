import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

interface Category {
  name: string;
  dbCategory: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    name: 'Peptides',
    dbCategory: 'All Peptides',
    image: 'https://beyond-peptides.com/wp-content/uploads/2025/10/Peptide-Bottle.webp',
    link: '/product-category/peptide-products/',
  },
];

function CategoryCard({ category, count }: { category: Category; count: number | null }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={category.link}
      className="group flex flex-col rounded-2xl overflow-hidden border border-transparent transition-all duration-300"
      style={{
        background: '#f8f9fa',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.06)' : 'none',
        borderColor: hovered ? '#e5e7eb' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-center px-6 pt-8 pb-4">
        <img
          src={category.image}
          alt={category.name}
          className="w-full max-w-[200px] h-auto object-contain transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
      </div>

      <div className="text-center px-6 pb-8 pt-2">
        <h4 className="font-primary text-[16px] font-semibold text-[#0F172A] mb-1">
          {category.name}
        </h4>
        <span className="text-[13px] text-[#8494A6]">
          {count === null ? '…' : `${count} Products`}
        </span>
      </div>
    </a>
  );
}

export default function Categories() {
  const { products } = useProducts();

  const countFor = (dbCat: string) =>
    products.length === 0 ? null : products.filter((p) => p.category === dbCat).length;

  return (
    <section className="py-[60px] px-[60px] text-center" style={{ background: '#f8f9fa' }}>
      <div className="mx-auto max-w-[1320px]">
        <h2 className="font-primary font-bold text-[28px] text-[#0F172A] mb-10">
          High-Purity Compounds for Every Study
        </h2>

        <div className="flex justify-center max-w-[900px] mx-auto">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} count={countFor(cat.dbCategory)} />
          ))}
        </div>
      </div>
    </section>
  );
}
