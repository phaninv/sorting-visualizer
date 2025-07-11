import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 3, 8, 4, 2, 7, 1, 6];

function stoogeSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  steps.push([...a]);
  highlights.push([]);
  function stoogeSort(l: number, h: number) {
    if (l >= h) return;
    if (a[l] > a[h]) {
      [a[l], a[h]] = [a[h], a[l]];
      steps.push([...a]);
      highlights.push([l, h]);
    }
    if (h - l + 1 > 2) {
      let t = Math.floor((h - l + 1) / 3);
      stoogeSort(l, h - t);
      stoogeSort(l + t, h);
      stoogeSort(l, h - t);
    }
  }
  stoogeSort(0, a.length - 1);
  return { steps, highlights };
}

const codeSamples = {
  Python: `def stooge_sort(arr, l=0, h=None):
    if h is None:
        h = len(arr) - 1
    
    if l >= h:
        return
    
    if arr[l] > arr[h]:
        arr[l], arr[h] = arr[h], arr[l]
    
    if h - l + 1 > 2:
        t = (h - l + 1) // 3
        stooge_sort(arr, l, h - t)
        stooge_sort(arr, l + t, h)
        stooge_sort(arr, l, h - t)

# Example usage
arr = [5, 3, 8, 4, 2, 7, 1, 6]
stooge_sort(arr)
print(arr)
`,
  Java: `public static void stoogeSort(int[] arr, int l, int h) {
    if (l >= h) return;
    
    if (arr[l] > arr[h]) {
        int temp = arr[l];
        arr[l] = arr[h];
        arr[h] = temp;
    }
    
    if (h - l + 1 > 2) {
        int t = (h - l + 1) / 3;
        stoogeSort(arr, l, h - t);
        stoogeSort(arr, l + t, h);
        stoogeSort(arr, l, h - t);
    }
}

// Example usage
int[] arr = {5, 3, 8, 4, 2, 7, 1, 6};
stoogeSort(arr, 0, arr.length - 1);
`,
  JavaScript: `function stoogeSort(arr, l = 0, h = arr.length - 1) {
  if (l >= h) return;
  
  if (arr[l] > arr[h]) {
    [arr[l], arr[h]] = [arr[h], arr[l]];
  }
  
  if (h - l + 1 > 2) {
    let t = Math.floor((h - l + 1) / 3);
    stoogeSort(arr, l, h - t);
    stoogeSort(arr, l + t, h);
    stoogeSort(arr, l, h - t);
  }
}

// Example usage
const arr = [5, 3, 8, 4, 2, 7, 1, 6];
stoogeSort(arr);

`,
  'C#': `public static void StoogeSort(int[] arr, int l, int h) {
    if (l >= h) return;
    
    if (arr[l] > arr[h]) {
        int temp = arr[l];
        arr[l] = arr[h];
        arr[h] = temp;
    }
    
    if (h - l + 1 > 2) {
        int t = (h - l + 1) / 3;
        StoogeSort(arr, l, h - t);
        StoogeSort(arr, l + t, h);
        StoogeSort(arr, l, h - t);
    }
}

// Example usage
int[] arr = { 5, 3, 8, 4, 2, 7, 1, 6 };
StoogeSort(arr, 0, arr.Length - 1);
`,
};

const StoogeSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(stoogeSortSteps(defaultArray));
  const [step, setStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [codeTab, setCodeTab] = useState<'Python' | 'Java' | 'JavaScript' | 'C#'>('Python');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSetArray = () => {
    const arr = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    setSortData(stoogeSortSteps(arr));
    setStep(0);
    setIsAutoPlaying(false);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => {
    setStep(0);
    setIsAutoPlaying(false);
  };

  const autoPlay = () => {
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (isAutoPlaying && step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAutoPlaying && step === steps.length - 1) {
      setIsAutoPlaying(false);
    }
  }, [isAutoPlaying, step, steps.length]);

  const getSimulationNote = () => {
    if (step === 0) return 'Initial array state.';
    if (step === steps.length - 1) return 'Array is now sorted!';
    
    const currentHighlights = highlights[step];
    if (currentHighlights.length >= 2) {
      const [first, second] = currentHighlights;
      const firstValue = steps[step][first];
      const secondValue = steps[step][second];
      return `Step ${step}: Swapping elements ${firstValue} and ${secondValue} at positions ${first} and ${second}. This is part of the recursive three-thirds sorting process.`;
    }
    return `Step ${step}: Continuing with the recursive three-thirds sorting algorithm.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Stooge Sort Visualizer</h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Left Column */}
        <div style={{ 
          flex: 1,
          textAlign: 'left',
          width: isMobile ? '100%' : '50%'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>How it works:</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Stooge Sort is a recursive sorting algorithm with a very poor time complexity. It works by recursively sorting the initial two-thirds of the array, 
            then the final two-thirds, and then the initial two-thirds again. It is mostly used as an educational example of an inefficient algorithm.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>If the first element is greater than the last, swap them</li>
            <li>Recursively sort the initial two-thirds of the array</li>
            <li>Recursively sort the final two-thirds of the array</li>
            <li>Recursively sort the initial two-thirds again</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Extremely inefficient algorithm</li>
            <li>Rarely used in practice</li>
            <li>Fun for educational purposes</li>
            <li>Uses recursive three-thirds approach</li>
            <li>Demonstrates poor algorithm design</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n<sup>2.709...</sup>)</li>
            <li>Space: O(n) (due to recursion stack)</li>
          </ul>
        </div>

        {/* Right Column */}
        <div style={{ 
          flex: 1,
          width: isMobile ? '100%' : '50%'
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Simulation
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                style={{ width: '300px', padding: '0.5rem', fontSize: '1rem' }}
              />
              <button 
                onClick={handleSetArray} 
                style={{ 
                  marginLeft: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  background: '#4f8cff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Input Array
              </button>
            </div>
            
            <div className="array-container">
              {steps[step].map((num, idx) => (
                <div
                  key={idx}
                  className="array-bar"
                  style={{
                    height: `${num * 30}px`,
                    background: highlights[step].includes(idx) ? '#ffb347' : '#4f8cff',
                    color: highlights[step].includes(idx) ? '#222' : '#fff',
                    border: highlights[step].includes(idx) ? '2px solid #ff9800' : '1px solid #4f8cff',
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
            
            <div className="controls">
              <button onClick={prevStep} disabled={step === 0}>Previous</button>
              <button onClick={nextStep} disabled={step === steps.length - 1}>Next</button>
              <button onClick={autoPlay} disabled={isAutoPlaying || step === steps.length - 1}>Auto</button>
              <button onClick={reset}>Reset</button>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
              <strong>Simulation Note:</strong> {getSimulationNote()}
            </div>
          </div>

          <div className="info" style={{ marginTop: '2rem' }}>
            <h2>Sample Codes</h2>
            <div style={{ marginBottom: '1rem' }}>
              <button 
                onClick={() => setCodeTab('Python')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: codeTab === 'Python' ? '#4f8cff' : '#ddd',
                  color: codeTab === 'Python' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Python
              </button>
              <button 
                onClick={() => setCodeTab('Java')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: codeTab === 'Java' ? '#4f8cff' : '#ddd',
                  color: codeTab === 'Java' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Java
              </button>
              <button 
                onClick={() => setCodeTab('JavaScript')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: codeTab === 'JavaScript' ? '#4f8cff' : '#ddd',
                  color: codeTab === 'JavaScript' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                JavaScript
              </button>
              <button 
                onClick={() => setCodeTab('C#')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: codeTab === 'C#' ? '#4f8cff' : '#ddd',
                  color: codeTab === 'C#' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                C#
              </button>
            </div>
            <pre style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              {codeSamples[codeTab]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoogeSortPage; 