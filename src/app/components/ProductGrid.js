'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetFilters, setCategory } from '../Store/productsSlice';
import ProductCard from './ProductCard';
import { useRouter } from 'next/router';

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector((state) => state.products);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!filteredProducts.length) {
      dispatch(resetFilters());
    }
  }, [filteredProducts, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category));
    }
  }, [category, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}