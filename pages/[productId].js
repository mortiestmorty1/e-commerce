import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProductDetail from '../src/app/components/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  const product = useSelector((state) => state.products.products.find((p) => p.id === parseInt(productId)));
  useEffect(() => {
    console.log('Filtered products:', filteredProducts);
  }, [filteredProducts]);
  if (!product) return <div>Loading...</div>;

  return <ProductDetail product={product} />;
}