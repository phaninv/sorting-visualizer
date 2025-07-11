# Sorting Algorithm Visualizer

An interactive web application that visualizes various sorting algorithms with step-by-step animations and code examples.

## Features

- **14 Sorting Algorithms**: Bubble, Bucket, Counting, Heap, Insertion, Merge, Odd-Even, Quick, Radix, Selection, Shell, Sleep, Stooge, and TimSort
- **Interactive Visualizations**: Step-by-step animations showing how each algorithm works
- **Code Examples**: Implementation in Python, Java, JavaScript, and C#
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with circular navigation

## Technologies Used

- React 18 with TypeScript
- React Router for navigation
- CSS3 for styling and animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sorting-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Project Structure

```
src/
├── components/
│   └── Navigation.tsx    # Top navigation component
├── sorts/
│   ├── BubbleSortPage.tsx
│   ├── SelectionSortPage.tsx
│   ├── InsertionSortPage.tsx
│   ├── MergeSortPage.tsx
│   ├── QuickSortPage.tsx
│   ├── HeapSortPage.tsx
│   ├── RadixSortPage.tsx
│   ├── ShellSort.tsx
│   ├── CountingSort.tsx
│   ├── BucketSort.tsx
│   ├── TimSort.tsx
│   ├── OddEvenSortPage.tsx
│   ├── SleepSortPage.tsx
│   └── StoogeSortPage.tsx
├── App.tsx              # Main application component
├── App.css              # Global styles
└── index.tsx            # Application entry point
```

## Features in Detail

### Navigation
- Circular sort icons with emoji representations
- Horizontal scrolling for overflow
- Distinct home button design
- Smooth scrolling to active sort

### Algorithm Pages
- Two-column responsive layout
- Left: Algorithm explanation and complexity
- Right: Interactive simulation and code examples
- Step-by-step visualization with controls
- Tabbed code samples in multiple languages

### Responsive Design
- Mobile-optimized navigation
- Adaptive layouts for different screen sizes
- Touch-friendly controls

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
