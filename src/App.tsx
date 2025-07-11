import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BubbleSortPage from './sorts/BubbleSortPage';
import SelectionSortPage from './sorts/SelectionSortPage';
import InsertionSortPage from './sorts/InsertionSortPage';
import MergeSortPage from './sorts/MergeSortPage';
import QuickSortPage from './sorts/QuickSortPage';
import HeapSortPage from './sorts/HeapSortPage';
import RadixSortPage from './sorts/RadixSortPage';
import ShellSort from './sorts/ShellSort';
import CountingSort from './sorts/CountingSort';
import BucketSort from './sorts/BucketSort';
import TimSort from './sorts/TimSort';
import OddEvenSortPage from './sorts/OddEvenSortPage';
import SleepSortPage from './sorts/SleepSortPage';
import StoogeSortPage from './sorts/StoogeSortPage';

const sorts = [
  { 
    name: 'Bubble Sort', 
    path: '/bubble',
    icon: '🫧',
    description: 'Simple comparison-based algorithm',
    complexity: 'O(n²)'
  },
  { 
    name: 'Bucket Sort', 
    path: '/bucket',
    icon: '🪣',
    description: 'Distribute elements into buckets',
    complexity: 'O(n+k)'
  },
  { 
    name: 'Counting Sort', 
    path: '/counting',
    icon: '🔢',
    description: 'Count occurrences of each element',
    complexity: 'O(n+k)'
  },
  { 
    name: 'Heap Sort', 
    path: '/heap',
    icon: '🌳',
    description: 'Uses heap data structure',
    complexity: 'O(n log n)'
  },
  { 
    name: 'Insertion Sort', 
    path: '/insertion',
    icon: '📝',
    description: 'Build sorted array one element at a time',
    complexity: 'O(n²)'
  },
  { 
    name: 'Merge Sort', 
    path: '/merge',
    icon: '🔀',
    description: 'Divide and conquer algorithm',
    complexity: 'O(n log n)'
  },
  { 
    name: 'Odd-Even Sort', 
    path: '/oddeven',
    icon: '⚡',
    description: 'Parallel sorting algorithm',
    complexity: 'O(n²)'
  },
  { 
    name: 'Quick Sort', 
    path: '/quick',
    icon: '⚡',
    description: 'Partition-based divide and conquer',
    complexity: 'O(n log n)'
  },
  { 
    name: 'Radix Sort', 
    path: '/radix',
    icon: '🔢',
    description: 'Sort by individual digits',
    complexity: 'O(d(n+k))'
  },
  { 
    name: 'Selection Sort', 
    path: '/selection',
    icon: '🎯',
    description: 'Find minimum and place at beginning',
    complexity: 'O(n²)'
  },
  { 
    name: 'Shell Sort', 
    path: '/shell',
    icon: '🐚',
    description: 'Gap-based insertion sort',
    complexity: 'O(n log n)'
  },
  { 
    name: 'Sleep Sort', 
    path: '/sleep',
    icon: '😴',
    description: 'Fun algorithm using timing',
    complexity: 'O(n + max)'
  },
  { 
    name: 'Stooge Sort', 
    path: '/stooge',
    icon: '🤪',
    description: 'Recursive three-thirds approach',
    complexity: 'O(n^2.709)'
  },
  { 
    name: 'TimSort', 
    path: '/timsort',
    icon: '⚙️',
    description: 'Hybrid of merge and insertion sort',
    complexity: 'O(n log n)'
  },
];

function Home() {
  return (
    <div className="App">
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#333', 
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          Welcome to Sorting Algorithm Visualizer
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '3rem',
          fontWeight: '300'
        }}>
          Choose the sorting algorithm to proceed
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {sorts.map(sort => (
            <Link 
              key={sort.path} 
              to={sort.path} 
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                outline: 'none',
                userSelect: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <div style={{
                background: '#fff',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#4f8cff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  {sort.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  color: '#333', 
                  margin: '0 0 0.5rem 0',
                  fontWeight: 'bold'
                }}>
                  {sort.name}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.4'
                }}>
                  {sort.description}
                </p>
                <div style={{
                  background: '#4f8cff',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}>
                  {sort.complexity}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Global styles to prevent focus outlines and text selection */}
      <style>{`
        .App a:focus {
          outline: none !important;
        }
        .App a {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .App div {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble" element={<BubbleSortPage />} />
        <Route path="/selection" element={<SelectionSortPage />} />
        <Route path="/insertion" element={<InsertionSortPage />} />
        <Route path="/merge" element={<MergeSortPage />} />
        <Route path="/quick" element={<QuickSortPage />} />
        <Route path="/heap" element={<HeapSortPage />} />
        <Route path="/radix" element={<RadixSortPage />} />
        <Route path="/shell" element={<ShellSort />} />
        <Route path="/counting" element={<CountingSort />} />
        <Route path="/bucket" element={<BucketSort />} />
        <Route path="/timsort" element={<TimSort />} />
        <Route path="/oddeven" element={<OddEvenSortPage />} />
        <Route path="/sleep" element={<SleepSortPage />} />
        <Route path="/stooge" element={<StoogeSortPage />} />
      </Routes>
    </Router>
  );
}

export default App;
