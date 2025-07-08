import { MacBookProduct } from '@/types/product'

export const macbookProducts: MacBookProduct[] = [
  // MacBook Air M3 15-inch
  {
    id: 'mba-m3-15',
    name: 'MacBook Air 15"',
    model: 'M3',
    year: 2024,
    price: 1299,
    chip: 'Apple M3',
    chipDetails: {
      cpu: '8-core CPU',
      gpu: '10-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['8GB', '16GB', '24GB'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    display: {
      size: '15.3-inch',
      resolution: '2880 x 1864',
      brightness: '500 nits',
      colorSpace: 'P3 wide color'
    },
    battery: 'Up to 18 hours',
    weight: '3.3 pounds (1.51 kg)',
    dimensions: '13.40 x 9.35 x 0.45 inches',
    color: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-gallery1-202306?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1683846366669',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-gallery2-202306?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1683915915756',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-gallery3-202306?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1683915914894'
    ],
    description: 'The 15-inch MacBook Air is impossibly thin and has a stunning Liquid Retina display. Supercharged by the M3 chip.',
    features: ['Liquid Retina display', 'MagSafe charging', '1080p FaceTime HD camera', 'Six-speaker sound system', 'Touch ID', 'Force Touch trackpad'],
    releaseDate: '2024-03-04',
    category: 'MacBook Air'
  },
  // MacBook Air M3 13-inch
  {
    id: 'mba-m3-13',
    name: 'MacBook Air 13"',
    model: 'M3',
    year: 2024,
    price: 1099,
    chip: 'Apple M3',
    chipDetails: {
      cpu: '8-core CPU',
      gpu: '8-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['8GB', '16GB', '24GB'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    display: {
      size: '13.6-inch',
      resolution: '2560 x 1664',
      brightness: '500 nits',
      colorSpace: 'P3 wide color'
    },
    battery: 'Up to 18 hours',
    weight: '2.7 pounds (1.24 kg)',
    dimensions: '11.97 x 8.46 x 0.44 inches',
    color: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707263270546',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-gallery2-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707840856972',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-gallery3-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707840857227'
    ],
    description: 'MacBook Air 13" sails through work and play. Supercharged by the M3 chip with an 8-core CPU and 8-core GPU.',
    features: ['Liquid Retina display', 'MagSafe charging', '1080p FaceTime HD camera', 'Four-speaker sound system', 'Touch ID', 'Force Touch trackpad'],
    releaseDate: '2024-03-04',
    category: 'MacBook Air'
  },
  // MacBook Pro 14" M3 Pro
  {
    id: 'mbp-m3pro-14',
    name: 'MacBook Pro 14"',
    model: 'M3 Pro',
    year: 2023,
    price: 1999,
    chip: 'Apple M3 Pro',
    chipDetails: {
      cpu: '11-core CPU',
      gpu: '14-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['18GB', '36GB'],
    storage: ['512GB', '1TB', '2TB', '4TB'],
    display: {
      size: '14.2-inch',
      resolution: '3024 x 1964',
      brightness: '1600 nits peak',
      colorSpace: 'XDR (Extreme Dynamic Range)'
    },
    battery: 'Up to 18 hours',
    weight: '3.5 pounds (1.60 kg)',
    dimensions: '12.31 x 8.71 x 0.60 inches',
    color: ['Space Black', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-m3-pro-max-space-black-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054011',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-gallery1-202310?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1697553707718'
    ],
    description: 'The 14-inch MacBook Pro with M3 Pro chip is a powerhouse for demanding workflows with incredible performance and battery life.',
    features: ['Liquid Retina XDR display', 'ProMotion technology', '1080p FaceTime HD camera', 'Six-speaker sound system', 'Studio-quality mics', 'HDMI port', 'SDXC card slot', 'MagSafe 3'],
    releaseDate: '2023-11-07',
    category: 'MacBook Pro'
  },
  // MacBook Pro 14" M3 Max
  {
    id: 'mbp-m3max-14',
    name: 'MacBook Pro 14"',
    model: 'M3 Max',
    year: 2023,
    price: 3199,
    chip: 'Apple M3 Max',
    chipDetails: {
      cpu: '14-core CPU',
      gpu: '30-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['36GB', '48GB', '64GB', '96GB', '128GB'],
    storage: ['1TB', '2TB', '4TB', '8TB'],
    display: {
      size: '14.2-inch',
      resolution: '3024 x 1964',
      brightness: '1600 nits peak',
      colorSpace: 'XDR (Extreme Dynamic Range)'
    },
    battery: 'Up to 18 hours',
    weight: '3.6 pounds (1.62 kg)',
    dimensions: '12.31 x 8.71 x 0.61 inches',
    color: ['Space Black', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-m3-pro-max-space-black-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054011',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-gallery2-202310?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1697229861229'
    ],
    description: 'MacBook Pro 14" with M3 Max takes performance to new extremes with the most advanced chip ever built for a personal computer.',
    features: [
      'Liquid Retina XDR display',
      'ProMotion technology',
      '1080p FaceTime HD camera',
      'Six-speaker sound system',
      'Studio-quality mics',
      'HDMI port',
      'SDXC card slot',
      'MagSafe 3',
      'Three Thunderbolt 4 ports'
    ],
    releaseDate: '2023-11-07',
    category: 'MacBook Pro'
  },
  // MacBook Pro 16" M3 Pro
  {
    id: 'mbp-m3pro-16',
    name: 'MacBook Pro 16"',
    model: 'M3 Pro',
    year: 2023,
    price: 2499,
    chip: 'Apple M3 Pro',
    chipDetails: {
      cpu: '12-core CPU',
      gpu: '18-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['18GB', '36GB'],
    storage: ['512GB', '1TB', '2TB', '4TB'],
    display: {
      size: '16.2-inch',
      resolution: '3456 x 2234',
      brightness: '1600 nits peak',
      colorSpace: 'XDR (Extreme Dynamic Range)'
    },
    battery: 'Up to 22 hours',
    weight: '4.7 pounds (2.14 kg)',
    dimensions: '14.01 x 9.77 x 0.66 inches',
    color: ['Space Black', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-m3-pro-max-space-black-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054013',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-gallery1-202310?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1697230830244'
    ],
    description: 'The 16-inch MacBook Pro with M3 Pro delivers phenomenal performance for the most demanding pro workflows.',
    features: ['Liquid Retina XDR display', 'ProMotion technology', '1080p FaceTime HD camera', 'Six-speaker sound system', 'Studio-quality mics', 'HDMI port', 'SDXC card slot', 'MagSafe 3'],
    releaseDate: '2023-11-07',
    category: 'MacBook Pro'
  },
  // MacBook Pro 16" M3 Max
  {
    id: 'mbp-m3max-16',
    name: 'MacBook Pro 16"',
    model: 'M3 Max',
    year: 2023,
    price: 3499,
    chip: 'Apple M3 Max',
    chipDetails: {
      cpu: '16-core CPU',
      gpu: '40-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['48GB', '64GB', '96GB', '128GB'],
    storage: ['1TB', '2TB', '4TB', '8TB'],
    display: {
      size: '16.2-inch',
      resolution: '3456 x 2234',
      brightness: '1600 nits peak',
      colorSpace: 'XDR (Extreme Dynamic Range)'
    },
    battery: 'Up to 22 hours',
    weight: '4.8 pounds (2.16 kg)',
    dimensions: '14.01 x 9.77 x 0.66 inches',
    color: ['Space Black', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-m3-pro-max-space-black-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054013',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-gallery2-202310?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1697230830200'
    ],
    description: 'The most powerful MacBook Pro ever with M3 Max chip. Built for the most extreme workflows.',
    features: [
      'Liquid Retina XDR display',
      'ProMotion technology',
      '1080p FaceTime HD camera',
      'Six-speaker sound system',
      'Studio-quality mics',
      'HDMI port',
      'SDXC card slot',
      'MagSafe 3',
      'Three Thunderbolt 4 ports'
    ],
    releaseDate: '2023-11-07',
    category: 'MacBook Pro'
  },
  // MacBook Air M2 13-inch (still available)
  {
    id: 'mba-m2-13',
    name: 'MacBook Air 13"',
    model: 'M2',
    year: 2022,
    price: 999,
    chip: 'Apple M2',
    chipDetails: {
      cpu: '8-core CPU',
      gpu: '8-core GPU',
      neuralEngine: '16-core Neural Engine'
    },
    ram: ['8GB', '16GB', '24GB'],
    storage: ['256GB', '512GB', '1TB', '2TB'],
    display: {
      size: '13.6-inch',
      resolution: '2560 x 1664',
      brightness: '500 nits',
      colorSpace: 'P3 wide color'
    },
    battery: 'Up to 18 hours',
    weight: '2.7 pounds (1.24 kg)',
    dimensions: '11.97 x 8.46 x 0.44 inches',
    color: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gallery1-20220606?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1653081456435'
    ],
    description: 'Redesigned around the M2 chip, MacBook Air is thinner, lighter, and faster with a bigger display.',
    features: ['Liquid Retina display', 'MagSafe charging', '1080p FaceTime HD camera', 'Four-speaker sound system', 'Touch ID', 'Force Touch trackpad'],
    releaseDate: '2022-07-15',
    category: 'MacBook Air'
  }
]
