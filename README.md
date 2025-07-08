# MacBook Showcase

A modern, responsive web application built with Next.js to showcase MacBook products with detailed specifications and features.

## Features

- 🎯 **Product Showcase**: Beautiful display of MacBook Air and MacBook Pro models
- 🔍 **Smart Search**: Real-time search functionality
- 🎛️ **Advanced Filtering**: Filter by category, chip, year, and price
- 📊 **Sorting Options**: Sort by name, price, or release date
- 🖼️ **Image Carousel**: Multiple product images with smooth navigation
- 📱 **Fully Responsive**: Optimized for all devices
- ⚡ **Performance Optimized**: Fast loading with skeleton states
- 🎨 **Modern UI**: Clean design with smooth animations

## Tech Stack

- **Framework**: Next.js 15
- **UI Components**: Shadcn/ui
- **State Management**: Jotai
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/               # Next.js app directory
├── components/        # React components
│   ├── FilterControls.tsx
│   ├── ImageCarousel.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetailModal.tsx
│   ├── ProductGrid.tsx
│   ├── ProductSkeleton.tsx
│   ├── ProductStats.tsx
│   └── SearchBar.tsx
├── data/             # Mock product data
├── store/            # Jotai atoms for state
├── types/            # TypeScript types
└── lib/              # Utility functions
```

## Building for Production

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes only. All MacBook product information and images belong to Apple Inc.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
