import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export type AppleProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge: string;
};

export const products: AppleProduct[] = [
  {
    id: 'small-bag',
    name: 'Small Bag',
    price: 3,
    description: 'Perfect for a quick snack or lunchbox refill.',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80',
    badge: 'Snack size',
  },
  {
    id: 'ten-pack',
    name: '10-Pack',
    price: 10,
    description: 'A crisp mix for families, picnics, and workweeks.',
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    badge: 'Best value',
  },
  {
    id: 'family-box',
    name: 'Family Box',
    price: 18,
    description: 'Sweet, juicy apples for weekend baking and gifting.',
    image:
      'https://images.unsplash.com/photo-1519996521430-02b1c4f7c5d8?auto=format&fit=crop&w=900&q=80',
    badge: 'Family favorite',
  },
];

export const shippingRate = 5;
export const taxRate = 0.08;
