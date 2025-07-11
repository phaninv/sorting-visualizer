import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [170, 45, 75, 90, 802, 24, 2, 66];

const radixSortSteps = (arr: number[]) => {
  type Step = {
    array: number[];
    digit: number | null;
    buckets: number[][];
    sorted: boolean;
  };
  const steps: Step[] = [];
  let a = [...arr];
  let max = Math.max(...a);
  let exp = 1;
  let sorted = false;

  const getDigit = (num: number, exp: number) => Math.floor(num / exp) % 10;

  while (Math.floor(max / exp) > 0) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < a.length; i++) {
      buckets[getDigit(a[i], exp)].push(a[i]);
    }
    steps.push({ array: [...a], digit: exp, buckets: buckets.map(b => [...b]), sorted });
    a = ([] as number[]).concat(...buckets);
    exp *= 10;
  }
  sorted = true;
  steps.push({ array: [...a], digit: null, buckets: [], sorted });
  return steps;
};

const codeSamples = {
  Python: `def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max1 = max(arr)
    exp = 1
    while max1 // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

arr = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(arr)
print(arr)
`,
  Java: `public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSort(arr, exp);
    }
}
private static void countingSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}
`,
  JavaScript: `function radixSort(arr) {
  let max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr.length; i++) {
      buckets[Math.floor(arr[i] / exp) % 10].push(arr[i]);
    }
    arr = [].concat(...buckets);
    exp *= 10;
  }
  return arr;
}
const arr = [170, 45, 75, 90, 802, 24, 2, 66];

`,
  'C#': `public static void RadixSort(int[] arr) {
    int max = arr.Max();
    for (int exp = 1; max / exp > 0; exp *= 10) {
        CountingSort(arr, exp);
    }
}
private static void CountingSort(int[] arr, int exp) {
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}
`,
};

const RadixSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [steps, setSteps] = useState(radixSortSteps(defaultArray));
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
    setSteps(radixSortSteps(arr));
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
      }, 1200);
      return () => clearTimeout(timer);
    } else if (isAutoPlaying && step === steps.length - 1) {
      setIsAutoPlaying(false);
    }
  }, [isAutoPlaying, step, steps.length]);

  const current = steps[step];

  // Color logic for bars
  const getBarColor = (num: number) => {
    if (current.sorted) return '#5cb85c'; // green for sorted
    return '#4f8cff'; // blue for unsorted
  };

  // Simulation note logic
  const getSimulationNote = () => {
    if (step === 0) return 'Initial array state.';
    if (step === steps.length - 1) return 'Array is now sorted!';
    const currentStep = steps[step];
    if (!currentStep.sorted && currentStep.digit) {
      return `Step ${step}: Sorting by digit place ${currentStep.digit}.\nEach number is placed into a bucket based on this digit, then the array is rebuilt from the buckets.`;
    }
    return `Step ${step}: Continuing to sort by next digit.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Radix Sort Visualizer</h1>
      
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
            Radix Sort is a non-comparative integer sorting algorithm that sorts numbers by processing individual digits. It works by sorting the numbers by the least significant digit, then by the next least significant, and so on.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Find the maximum number to know the number of digits</li>
            <li>Sort the array based on each digit (starting from least significant to most significant)</li>
            <li>Use counting sort or bucket sort for each digit</li>
            <li>Repeat for each digit position</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Non-comparative sorting algorithm</li>
            <li>Efficient for sorting large numbers of integers</li>
            <li>Stable sort (preserves relative order of equal elements)</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(d(n + k)), where d is the number of digits and k is the range of digits</li>
            <li>Space: O(n + k)</li>
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
            
            {/* Legend */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '16px', height: '16px', background: '#4f8cff', borderRadius: '2px' }}></span>
                Unsorted/Current
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '16px', height: '16px', background: '#5cb85c', borderRadius: '2px' }}></span>
                Sorted
              </span>
            </div>
            
            {/* Array bars */}
            <div className="array-container" style={{ flexWrap: 'wrap', overflowX: 'auto', marginBottom: '1rem' }}>
              {current.array.map((num, idx) => (
                <div key={idx} className="array-bar" style={{ height: `${num / 2}px`, background: getBarColor(num), minWidth: 32, maxWidth: 40, wordBreak: 'break-word' }}>
                  {num}
                </div>
              ))}
            </div>
            
            {/* Buckets visualization */}
            {!current.sorted && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Buckets</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', overflowX: 'auto' }}>
                  {current.buckets.map((bucket, i) => (
                    <div key={i} style={{ 
                      border: '1px solid #ddd', 
                      borderRadius: '4px', 
                      padding: '0.5rem', 
                      minWidth: '60px',
                      background: '#f9f9f9'
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', textAlign: 'center' }}>{i}</div>
                      {bucket.map((num, j) => (
                        <div key={j} style={{ 
                          background: '#4f8cff', 
                          color: 'white', 
                          padding: '0.25rem', 
                          margin: '0.25rem 0',
                          borderRadius: '2px',
                          textAlign: 'center',
                          fontSize: '0.875rem'
                        }}>{num}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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

export default RadixSortPage; 