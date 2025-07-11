import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [23, 12, 1, 8, 34, 54, 2, 3];

function shellSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  let n = a.length;
  steps.push([...a]);
  highlights.push([]);
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = a[i];
      let j = i;
      let highlight = [i];
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        highlight.push(j - gap);
        j -= gap;
      }
      a[j] = temp;
      steps.push([...a]);
      highlights.push([...highlight]);
    }
  }
  return { steps, highlights };
}

const codeSamples = {
  Python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr

# Example usage
arr = [23, 12, 1, 8, 34, 54, 2, 3]
print(shell_sort(arr))
`,
  Java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

// Example usage
int[] arr = {23, 12, 1, 8, 34, 54, 2, 3};
shellSort(arr);
`,
  JavaScript: `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

// Example usage
const arr = [23, 12, 1, 8, 34, 54, 2, 3];

`,
  'C#': `public static void ShellSort(int[] arr) {
    int n = arr.Length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

// Example usage
int[] arr = { 23, 12, 1, 8, 34, 54, 2, 3 };
ShellSort(arr);
`,
};

const ShellSort: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(shellSortSteps(defaultArray));
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
    setSortData(shellSortSteps(arr));
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
    
    if (currentHighlights.length > 0) {
      return `Step ${step}: Comparing and swapping elements with gap-based insertion sort. Highlighted elements are being compared and potentially swapped.`;
    }
    return `Step ${step}: Continuing with gap-based insertion sort.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Shell Sort Visualizer</h1>
      
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
            Shell Sort is an in-place comparison sort that generalizes insertion sort to allow the exchange of items that are far apart. 
            The idea is to arrange the list of elements so that, starting anywhere, considering every gapth element gives a sorted list. 
            Such a list is said to be h-sorted. The algorithm uses a sequence of gaps to perform insertion sort on elements that are a certain gap apart, 
            reducing the gap each time until it becomes 1 (regular insertion sort).
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Start with a large gap, then reduce the gap</li>
            <li>For each gap, perform a gapped insertion sort</li>
            <li>Compare elements that are gap positions apart</li>
            <li>Repeat until the gap is 1 and the array is sorted</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Improves on insertion sort by moving elements over large gaps</li>
            <li>Not stable, but in-place algorithm</li>
            <li>Gap sequence affects performance significantly</li>
            <li>Efficient for medium-sized arrays</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n log² n) average, O(n²) worst (depends on gap sequence)</li>
            <li>Space: O(1)</li>
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
                    height: `${num * 8 + 20}px`,
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

export default ShellSort; 