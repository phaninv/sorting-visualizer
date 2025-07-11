import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 3, 8, 4, 2, 7, 1, 6];

function oddEvenSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  let n = a.length;
  let sorted = false;
  steps.push([...a]);
  highlights.push([]);
  while (!sorted) {
    sorted = true;
    // Odd phase
    for (let i = 1; i <= n - 2; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        steps.push([...a]);
        highlights.push([i, i + 1]);
      }
    }
    // Even phase
    for (let i = 0; i <= n - 2; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        steps.push([...a]);
        highlights.push([i, i + 1]);
      }
    }
  }
  return { steps, highlights };
}

const oddEvenSortCode = {
  javascript: `function oddEvenSort(arr) {
  let n = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i <= n - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    for (let i = 0; i <= n - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}`,
  python: `def odd_even_sort(arr):
    n = len(arr)
    is_sorted = False
    while not is_sorted:
        is_sorted = True
        for i in range(1, n-1, 2):
            if arr[i] > arr[i+1]:
                arr[i], arr[i+1] = arr[i+1], arr[i]
                is_sorted = False
        for i in range(0, n-1, 2):
            if arr[i] > arr[i+1]:
                arr[i], arr[i+1] = arr[i+1], arr[i]
                is_sorted = False
    return arr`,
  java: `public static void oddEvenSort(int[] arr) {
    int n = arr.length;
    boolean isSorted = false;
    while (!isSorted) {
        isSorted = true;
        int temp;
        for (int i = 1; i <= n - 2; i += 2) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                isSorted = false;
            }
        }
        for (int i = 0; i <= n - 2; i += 2) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                isSorted = false;
            }
        }
    }
}`,
  csharp: `public static void OddEvenSort(int[] arr) {
    int n = arr.Length;
    bool isSorted = false;
    while (!isSorted) {
        isSorted = true;
        int temp;
        for (int i = 1; i <= n - 2; i += 2) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                isSorted = false;
            }
        }
        for (int i = 0; i <= n - 2; i += 2) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                isSorted = false;
            }
        }
    }
}`
};

const OddEvenSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(oddEvenSortSteps(defaultArray));
  const [step, setStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('javascript');
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
    setSortData(oddEvenSortSteps(arr));
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
    if (step === 0) return "Initial array state";
    if (step === steps.length - 1) return "Array is now sorted!";
    const hi = highlights[step] || [];
    if (hi.length === 2) {
      return `Step ${step}: Comparing and possibly swapping elements at positions ${hi[0]} and ${hi[1]}.`;
    }
    return `Step ${step}: No comparison in this step.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Odd-Even Sort Visualizer</h1>
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
            Odd-Even Sort (also known as Brick Sort) is a parallel sorting algorithm that works by comparing all odd/even indexed pairs of adjacent elements in the list and swapping them if they are in the wrong order. The process is repeated until the list is sorted.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Compare all odd indexed pairs (1,2), (3,4), ... and swap if needed</li>
            <li>Compare all even indexed pairs (0,1), (2,3), ... and swap if needed</li>
            <li>Repeat until no swaps are needed</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Parallelizable</li>
            <li>Simple to implement</li>
            <li>Not efficient for large lists</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n²) average/worst, O(n) best</li>
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
              {steps[step].map((num, idx) => {
                const hi = highlights[step] || [];
                let barColor = '#4f8cff';
                if (hi.includes(idx)) barColor = '#ffb347';
                return (
                  <div
                    key={idx}
                    className="array-bar"
                    style={{
                      height: `${num * 30}px`,
                      background: barColor,
                      color: '#222',
                      margin: '0 2px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      width: '32px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
            <div className="controls" style={{ marginTop: '1rem' }}>
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
                onClick={() => setActiveTab('python')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: activeTab === 'python' ? '#4f8cff' : '#ddd',
                  color: activeTab === 'python' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Python
              </button>
              <button
                onClick={() => setActiveTab('java')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: activeTab === 'java' ? '#4f8cff' : '#ddd',
                  color: activeTab === 'java' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Java
              </button>
              <button
                onClick={() => setActiveTab('javascript')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: activeTab === 'javascript' ? '#4f8cff' : '#ddd',
                  color: activeTab === 'javascript' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                JavaScript
              </button>
              <button
                onClick={() => setActiveTab('csharp')}
                style={{
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  background: activeTab === 'csharp' ? '#4f8cff' : '#ddd',
                  color: activeTab === 'csharp' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                C#
              </button>
            </div>
            <pre style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              {oddEvenSortCode[activeTab as keyof typeof oddEvenSortCode]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddEvenSortPage; 