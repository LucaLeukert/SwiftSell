#




S
wiftSell

SwiftSell is an ecommerce store hoster similar to Shopify. You can create and manage your own online store with SwiftSell, using the T3 stack with TRPC, Next.js, Prisma, Tailwind and Clerk auth.

## Features

- Create and customize your own ecommerce store with a few clicks
- Manage your products, orders, customers and inventory with a simple dashboard
- Accept payments with Stripe and PayPal
- Deploy your store on Vercel with serverless functions
- Secure your store with Clerk authentication and authorization

## Demo

You can see a live demo of SwiftSell here: https://swiftsell.vercel.app/

## Installation

To run SwiftSell locally, you need to have Node.js and PostgreSQL installed on your machine.

1. Clone this repository: `git clone https://github.com/LucaLeukert/SwiftSell.git`
2. Install the dependencies: `npm install`
3. Create a PostgreSQL database and update the `DATABASE_URL` in the `.env` file
4. Run the migrations: `npx prisma migrate dev`
5. Create a Clerk account and get your publishable key and secret key
6. Update the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in the `.env` file
7. Start the development server: `npm run dev`

## Contributing

SwiftSell is an open source project and pull requests are welcome. Please make sure to follow the code of conduct and the contribution guidelines before submitting your pull request.

## License

SwiftSell is licensed under the MIT License.
