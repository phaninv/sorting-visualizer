import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];

function bucketSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  steps.push([...a]);
  highlights.push([]);
  const n = a.length;
  if (n === 0) return { steps, highlights };
  let buckets: number[][] = Array.from({ length: n }, () => []);
  // Distribute
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(a[i] * n);
    buckets[idx].push(a[i]);
    highlights.push([i]);
    steps.push([...a]);
  }
  // Sort buckets and concatenate
  let idx = 0;
  for (let b = 0; b < n; b++) {
    buckets[b].sort((x, y) => x - y);
    for (let v of buckets[b]) {
      a[idx++] = v;
      highlights.push([idx - 1]);
      steps.push([...a]);
    }
  }
  return { steps, highlights };
}

const bucketSortCode = {
  python: `def bucket_sort(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]
    for num in arr:
        idx = int(num * n)
        buckets[idx].append(num)
    for bucket in buckets:
        bucket.sort()
    result = []
    for bucket in buckets:
        result.extend(bucket)
    return result`,
  java: `public static void bucketSort(float[] arr) {
    int n = arr.length;
    List<Float>[] buckets = new List[n];
    for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();
    for (float num : arr) buckets[(int)(num * n)].add(num);
    for (List<Float> bucket : buckets) Collections.sort(bucket);
    int idx = 0;
    for (List<Float> bucket : buckets) for (float v : bucket) arr[idx++] = v;
}`,
  javascript: `function bucketSort(arr) {
  let n = arr.length;
  let buckets = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    let idx = Math.floor(arr[i] * n);
    buckets[idx].push(arr[i]);
  }
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
  }
  let idx = 0;
  for (let i = 0; i < n; i++) {
    for (let v of buckets[i]) {
      arr[idx++] = v;
    }
  }
  return arr;
}`,
  csharp: `public static void BucketSort(float[] arr) {
    int n = arr.Length;
    List<float>[] buckets = new List<float>[n];
    for (int i = 0; i < n; i++) buckets[i] = new List<float>();
    foreach (float num in arr) buckets[(int)(num * n)].Add(num);
    foreach (var bucket in buckets) bucket.Sort();
    int idx = 0;
    foreach (var bucket in buckets) foreach (var v in bucket) arr[idx++] = v;
}`
};

const BucketSort: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(bucketSortSteps(defaultArray));
  const [step, setStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('python');
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
    const arr = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    setSortData(bucketSortSteps(arr));
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

  // Simulation note
  const getSimulationNote = () => {
    if (step === 0) return "Initial array state";
    if (step < steps.length && highlights[step].length === 1 && step <= defaultArray.length) {
      return `Step ${step}: Placing value ${steps[step][highlights[step][0]]} into its bucket.`;
    }
    if (step === steps.length - 1) return "Array is now sorted!";
    if (step < steps.length && highlights[step].length === 1) {
      return `Step ${step}: Moving value ${steps[step][highlights[step][0]]} from bucket to sorted array.`;
    }
    return `Step ${step}: Processing bucket sort.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Bucket Sort Visualizer</h1>
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
            Bucket Sort is a distribution sort that works by partitioning an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sort. It is most effective when input is uniformly distributed over a range.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Distribute the elements into buckets</li>
            <li>Sort each bucket individually</li>
            <li>Concatenate all buckets into the original array</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Efficient for uniformly distributed data</li>
            <li>Not a comparison sort</li>
            <li>Not in-place (uses extra space for buckets)</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n + k) best, O(n²) worst (depends on distribution and sorting method)</li>
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
            <div className="array-container">
              {steps[step].map((num, idx) => (
                <div
                  key={idx}
                  className="array-bar"
                  style={{
                    height: `${num * 100 + 20}px`,
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
              {bucketSortCode[activeTab as keyof typeof bucketSortCode]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucketSort; 