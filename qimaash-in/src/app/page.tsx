import dbConnect from '@/lib/db';
import Product, { IProduct } from '@/models/Product';
import ProductCard from '@/components/ProductCard';

// This function will be called on the server to fetch the data
async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).lean();
  // Simple way to ensure the data is serializable for client components
  return JSON.parse(JSON.stringify(products));
}

export default async function Home() {
  // The type assertion is needed because JSON.parse returns `any`
  const products: IProduct[] = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-center">No products found. The database might be empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            // Mongoose's _id is a valid React key
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
