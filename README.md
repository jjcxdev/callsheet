# Call Sheet Generator

A modern, web-based call sheet generator for film and television productions. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 Create and customize production call sheets
- 🎭 Manage cast and crew information
- 📍 Location management with Google Maps integration
- 🌤️ Automatic weather forecasting for shooting locations
- 🖨️ Print-ready call sheet formatting
- 💾 Automatic saving of call sheet data
- 🌓 Light/Dark mode support
- 📱 Responsive design
- 🎨 Logo upload capabilities for client, agency, and production companies

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Google Maps API](https://developers.google.com/maps) - Location services
- [Tomorrow.io API](https://www.tomorrow.io/) - Weather forecasting

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jjcxdev/callsheet
cd callsheet
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_TOMORROW_API_KEY=your_tomorrow_io_api_key
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features in Detail

### Production Details

- Production name and information
- Day-of-days tracking
- Call times management
- Logo management for client, agency, and production

### Cast & Crew Management

- Department organization
- Crew member details
- Talent/Cast information
- Contact information
- Individual call times

### Location Management

- Multiple location support
- Google Maps integration
- Hospital locations
- Weather forecasting for shooting dates

### Additional Features

- Walkie channel assignment
- Notes section
- Vendor management
- Print-optimized layout
- Automatic data persistence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright (c) 2025 jjcx. All rights reserved.

This software is provided for personal and non-commercial use only. Any commercial use, including but not limited to selling, licensing, or monetizing this software or derivative works, is strictly prohibited without explicit written permission from the copyright holder.

You may view, fork, and modify this code for personal and educational purposes, but you may not:

- Use it for commercial purposes
- Distribute it as part of a commercial product
- Sell or license the code or any derivative works
- Remove or modify this copyright notice

For commercial licensing inquiries, please contact j@jjcx.dev
