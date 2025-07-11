import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 3, 8, 4, 2, 7, 1, 6];

const insertionSortSteps = (arr: number[]) => {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  const a = [...arr];
  const n = a.length;
  steps.push([...a]);
  highlights.push([-1, -1]);
  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      highlights.push([j, j + 1]);
      a[j + 1] = a[j];
      j--;
      steps.push([...a]);
    }
    a[j + 1] = key;
    highlights.push([j + 1, i]);
    if (j + 1 !== i) {
      steps.push([...a]);
    }
  }
  return { steps, highlights };
};

const insertionSortCode = {
  javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  csharp: `public static void InsertionSort(int[] arr) {
    for (int i = 1; i < arr.Length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
};

const InsertionSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(insertionSortSteps(defaultArray));
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
    setSortData(insertionSortSteps(arr));
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
    const [idxA, idxB] = highlights[step] || [-1, -1];
    if (idxA === -1 || idxB === -1) return `Step ${step}: No comparison in this step.`;
    if (steps[step][idxB] < steps[step][idxA]) {
      return `Step ${step}: Comparing and shifting ${steps[step][idxA]} right to make space for ${steps[step][idxB]}.`;
    } else {
      return `Step ${step}: Inserting ${steps[step][idxB]} into sorted portion.`;
    }
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Insertion Sort Visualizer</h1>
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
            Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one item at a time. 
            It works by iterating through the array and for each element, placing it in its correct position among the already sorted elements.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Start with the second element (index 1)</li>
            <li>Compare it with the previous element(s)</li>
            <li>If the current element is smaller, shift the previous element(s) to the right</li>
            <li>Continue shifting until the current element is in its correct position</li>
            <li>Move to the next element and repeat</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>In-place algorithm (uses only O(1) extra space)</li>
            <li>Stable sort (preserves relative order of equal elements)</li>
            <li>Adaptive algorithm (performs better on partially sorted arrays)</li>
            <li>Efficient for small datasets</li>
            <li>Best case: O(n) when array is already sorted</li>
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
                const [hiA, hiB] = highlights[step] || [-1, -1];
                let barColor = '#4f8cff';
                if (idx === hiA || idx === hiB) barColor = '#ffb347';
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
              {insertionSortCode[activeTab as keyof typeof insertionSortCode]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSortPage; 