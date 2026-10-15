"use client";

import { useMemo, useState } from 'react';
import { products, shippingRate, taxRate } from '@/lib/products';

type CartMap = Record<string, number>;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export function Storefront() {
  const [cart, setCart] = useState<CartMap>({});
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const addToCart = (productId: string) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) => {
      const nextQty = (current[productId] ?? 0) + delta;
      if (nextQty <= 0) {
        const { [productId]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [productId]: nextQty };
    });
  };

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([productId, qty]) => {
          const product = products.find((item) => item.id === productId);
          return product ? { ...product, qty } : null;
        })
        .filter(Boolean) as Array<(typeof products)[number] & { qty: number }>,
    [cart],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingRate + taxes;

  const checkout = () => {
    if (!cartItems.length) {
      setCheckoutMessage('Add apples to your cart before checking out.');
      return;
    }

    setCheckoutMessage(
      `Demo order placed! ${cartItems.length} item(s) ready for checkout. Total: ${formatCurrency(total)}.`,
    );
    setCart({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50 text-slate-900">
      <header className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex items-center justify-between rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orchard-500 text-xl text-white">🍏</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orchard-700">Apple Orchard</p>
              <p className="text-xs text-slate-500">Fresh from the farm</p>
            </div>
          </div>
          <div className="rounded-full bg-orchard-100 px-3 py-1 text-sm font-medium text-orchard-700">
            {cartItems.reduce((sum, item) => sum + item.qty, 0)} in cart
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            Seasonal pick
          </div>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Fresh Apples — crisp, locally grown.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Handpicked for sweetness, crunch, and color. We deliver orchard-fresh apples with simple,
            transparent pricing and demo checkout.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                      {product.badge}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900">{formatCurrency(product.price)}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="rounded-full bg-orchard-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orchard-600"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-900">Your cart</h2>

          <div className="mt-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                No apples selected yet.
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{formatCurrency(item.price)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-6 w-6 rounded-full bg-slate-100 text-lg leading-none"
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-6 w-6 rounded-full bg-slate-100 text-lg leading-none"
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="min-w-12 text-right font-semibold text-slate-900">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shippingRate)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(taxes)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            onClick={checkout}
            className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Proceed to checkout
          </button>

          {checkoutMessage ? (
            <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">{checkoutMessage}</div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
