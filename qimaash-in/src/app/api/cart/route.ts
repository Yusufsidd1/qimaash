import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product'; // We'll need this to validate products

const SESSION_COOKIE_NAME = 'qimaash_session_id';

// Helper to get or create a session
async function getSessionId() {
  const cookieStore = cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
  return sessionId;
}

// GET /api/cart - Fetches the user's cart
export async function GET(request: Request) {
  try {
    await dbConnect();
    const sessionId = await getSessionId();

    const cart = await Cart.findOne({ sessionId }).populate({
        path: 'items.product',
        model: Product
    });

    if (!cart) {
      // If no cart exists for this session, create one
      const newCart = await Cart.create({ sessionId, items: [] });
      return NextResponse.json({ success: true, data: newCart });
    }

    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    console.error('GET /api/cart Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// POST /api/cart - Adds or updates an item in the cart
export async function POST(request: Request) {
  try {
    await dbConnect();
    const sessionId = await getSessionId();
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== 'number') {
      return NextResponse.json({ success: false, error: 'Product ID and quantity are required.' }, { status: 400 });
    }

    const product = await Product.findById(productId);
    if(!product) {
        return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity
      if (quantity > 0) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        cart.items.splice(existingItemIndex, 1);
      }
    } else if (quantity > 0) {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Populate product details before sending back
    const updatedCart = await Cart.findById(cart._id).populate({
        path: 'items.product',
        model: Product
    });

    return NextResponse.json({ success: true, data: updatedCart });
  } catch (error) {
    console.error('POST /api/cart Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
