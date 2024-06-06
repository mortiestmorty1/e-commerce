import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategory, setSearchQuery } from '../Store/productsSlice';
import ProductCard from './ProductCard';
import { useRouter } from 'next/router';

export default function CategoryPage({ category }) {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector((state) => state.products);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      dispatch(setCategory(category));
    });
  }, [category, dispatch]);

  useEffect(() => {
    const query = router.query.search || '';
    dispatch(setSearchQuery({ query, category }));
  }, [router.query.search, category, dispatch]);

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