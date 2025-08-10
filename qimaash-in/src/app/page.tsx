import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product'; // Renamed to avoid conflict with the type
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types'; // Import our new plain type

// This function will be called on the server to fetch the data.
// It now returns a promise of an array of our plain Product type.
async function getProducts(): Promise<Product[]> {
  await dbConnect();
  const products = await ProductModel.find({}).lean();

  // Instead of JSON.parse(JSON.stringify()), we can manually map the data
  // to our plain Product type for better type safety.
  const plainProducts: Product[] = products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
  }));

  return plainProducts;
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-text-light">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products found. The database might be empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
