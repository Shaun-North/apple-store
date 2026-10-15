# Apple Orchard Market

A simple Next.js storefront for selling fresh apples. This project is set up in demo checkout mode, with product variants, flat shipping, and 8% tax.

## Features
- Modern landing page storefront for apples
- Three product variants: Small Bag, 10-Pack, Family Box
- Cart with quantity controls
- Demo checkout confirmation
- Responsive layout
- Tailwind styling

## Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Demo checkout
This is a mock checkout flow. It does not process real payments. It is configured for demo mode and can be upgraded later to Stripe Checkout.

## Deployment
The app is ready to deploy to Vercel:
1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Use the default Next.js settings.
4. Deploy.

## Customizing prices
Update the product details in `lib/products.ts` and the shipping/tax defaults in `components/storefront.tsx`.
