import { TProduct } from '@/types/product'

export const macbookProducts: TProduct[] = [
  // MacBook Air M3 15-inch
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzlDQTNBRiI+TWFjQm9vazwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUVGMkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzYzNjZGMSI+QWlyPC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0YyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5NzMxNiI+TTNAM1wvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkJGQ0RERO5UyByZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkJGQ0RERO5UyByZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkJGQ0RERO5UyxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkJGQ0RESO5UaWxsPSIjMTA3QzEwIj4xNSZxdW90OzwvdGV4dD4KPC9zdmc+'
    ],
    title: 'MacBook Air 15" (M3, 2024)',
    description: 'The 15-inch MacBook Air is impossibly thin and has a stunning Liquid Retina display. Supercharged by the M3 chip.',
    basePrice: 1299,
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '8GB', priceDiff: 0 },
          { label: '16GB', priceDiff: 200 },
          { label: '24GB', priceDiff: 400 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '256GB SSD', priceDiff: 0 },
          { label: '512GB SSD', priceDiff: 200 },
          { label: '1TB SSD', priceDiff: 500 },
          { label: '2TB SSD', priceDiff: 1000 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 8-core CPU, 10-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Air M3 13-inch
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzlDQTNBRiI+QWlyIDEzIjwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUVGMkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzYzNjZGMSI+TTMgQ2hpcDwvdGV4dD4KPC9zdmc>',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkVGM0YyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5NzMxNiI+TWFjQm9vazwvdGV4dD4KPC9zdmc>',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkJGREZFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzEwN0MxMCI+QWlyIDEzIjwvdGV4dD4KPC9zdmc>'
    ],
    title: 'MacBook Air 13" (M3, 2024)',
    description: 'MacBook Air 13" sails through work and play. Supercharged by the M3 chip with an 8-core CPU and 8-core GPU.',
    basePrice: 1099,
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '8GB', priceDiff: 0 },
          { label: '16GB', priceDiff: 200 },
          { label: '24GB', priceDiff: 400 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '256GB SSD', priceDiff: 0 },
          { label: '512GB SSD', priceDiff: 200 },
          { label: '1TB SSD', priceDiff: 500 },
          { label: '2TB SSD', priceDiff: 1000 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 8-core CPU, 8-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Pro 14" M3 Pro
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUYyOTM3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+UHJvIDE0IjwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+TTMgUHJvPC90ZXh0Pgo8L3N2Zz4='
    ],
    title: 'MacBook Pro 14" (M3 Pro, 2023)',
    description: 'The 14-inch MacBook Pro with M3 Pro chip is a powerhouse for demanding workflows with incredible performance and battery life.',
    basePrice: 1999,
    colors: ['Space Black', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '18GB', priceDiff: 0 },
          { label: '36GB', priceDiff: 800 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '512GB SSD', priceDiff: 0 },
          { label: '1TB SSD', priceDiff: 400 },
          { label: '2TB SSD', priceDiff: 1200 },
          { label: '4TB SSD', priceDiff: 2400 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 Pro 11-core CPU, 14-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Pro 14" M3 Max
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExODI3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+TTMgTWF4PC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMEYxNDJBIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+MTQiPC90ZXh0Pgo8L3N2Zz4='
    ],
    title: 'MacBook Pro 14" (M3 Max, 2023)',
    description: 'MacBook Pro 14" with M3 Max takes performance to new extremes with the most advanced chip ever built for a personal computer.',
    basePrice: 3199,
    colors: ['Space Black', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '36GB', priceDiff: 0 },
          { label: '48GB', priceDiff: 400 },
          { label: '64GB', priceDiff: 800 },
          { label: '96GB', priceDiff: 1600 },
          { label: '128GB', priceDiff: 2400 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '1TB SSD', priceDiff: 0 },
          { label: '2TB SSD', priceDiff: 800 },
          { label: '4TB SSD', priceDiff: 2000 },
          { label: '8TB SSD', priceDiff: 4400 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 Max 14-core CPU, 30-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Pro 16" M3 Pro
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUYyOTM3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+UHJvIDE2IjwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+MTYiPC90ZXh0Pgo8L3N2Zz4='
    ],
    title: 'MacBook Pro 16" (M3 Pro, 2023)',
    description: 'The 16-inch MacBook Pro with M3 Pro delivers phenomenal performance for the most demanding pro workflows.',
    basePrice: 2499,
    colors: ['Space Black', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '18GB', priceDiff: 0 },
          { label: '36GB', priceDiff: 800 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '512GB SSD', priceDiff: 0 },
          { label: '1TB SSD', priceDiff: 400 },
          { label: '2TB SSD', priceDiff: 1200 },
          { label: '4TB SSD', priceDiff: 2400 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 Pro 12-core CPU, 18-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Pro 16" M3 Max
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMUMxOTI3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+TTMgTWF4PC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTUxNzI3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iI0Y5RkFGQiI+MTYiIDwvdGV4dD4KPC9zdmc>'
    ],
    title: 'MacBook Pro 16" (M3 Max, 2023)',
    description: 'The most powerful MacBook Pro ever with M3 Max chip. Built for the most extreme workflows.',
    basePrice: 3499,
    colors: ['Space Black', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '48GB', priceDiff: 0 },
          { label: '64GB', priceDiff: 400 },
          { label: '96GB', priceDiff: 1200 },
          { label: '128GB', priceDiff: 2000 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '1TB SSD', priceDiff: 0 },
          { label: '2TB SSD', priceDiff: 800 },
          { label: '4TB SSD', priceDiff: 2000 },
          { label: '8TB SSD', priceDiff: 4400 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M3 Max 16-core CPU, 40-core GPU', priceDiff: 0 }]
      }
    ]
  },
  // MacBook Air M2 13-inch
  {
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzlDQTNBRiI+QWlyIE0yPC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUVGMkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzYzNjZGMSI+TTIgQ2hpcDwvdGV4dD4KPC9zdmc>'
    ],
    title: 'MacBook Air 13" (M2, 2022)',
    description: 'Redesigned around the M2 chip, MacBook Air is thinner, lighter, and faster with a bigger display.',
    basePrice: 999,
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    options: [
      {
        name: 'RAM',
        variants: [
          { label: '8GB', priceDiff: 0 },
          { label: '16GB', priceDiff: 200 },
          { label: '24GB', priceDiff: 400 }
        ]
      },
      {
        name: 'Storage',
        variants: [
          { label: '256GB SSD', priceDiff: 0 },
          { label: '512GB SSD', priceDiff: 200 },
          { label: '1TB SSD', priceDiff: 500 },
          { label: '2TB SSD', priceDiff: 1000 }
        ]
      },
      {
        name: 'Processor',
        variants: [{ label: 'M2 8-core CPU, 8-core GPU', priceDiff: 0 }]
      }
    ]
  }
]
