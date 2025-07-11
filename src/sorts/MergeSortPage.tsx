import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 3, 8, 4, 2, 7, 1, 6];

// Enhanced mergeSortSteps to track left, right, and merged indices for coloring
const mergeSortSteps = (arr: number[]) => {
  type Step = {
    array: number[];
    leftRange: [number, number] | null;
    rightRange: [number, number] | null;
    mergedRange: [number, number] | null;
  };
  const steps: Step[] = [];
  const a = [...arr];

  const recordStep = (leftRange: [number, number] | null, rightRange: [number, number] | null, mergedRange: [number, number] | null) => {
    steps.push({ array: [...a], leftRange, rightRange, mergedRange });
  };

  const merge = (left: number, mid: number, right: number) => {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    // Show left and right subarrays before merging
    recordStep([left, mid], [mid + 1, right], null);
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
      } else {
        a[k] = rightArr[j];
        j++;
      }
      // Show merged section as it grows
      recordStep(null, null, [left, k]);
      k++;
    }
    while (i < leftArr.length) {
      a[k] = leftArr[i];
      i++;
      // Show merged section as it grows
      recordStep(null, null, [left, k]);
      k++;
    }
    while (j < rightArr.length) {
      a[k] = rightArr[j];
      j++;
      // Show merged section as it grows
      recordStep(null, null, [left, k]);
      k++;
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  recordStep(null, null, null); // Initial state
  mergeSortHelper(0, a.length - 1);

  return steps;
};

const mergeSortCode = {
  python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}
public static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result[k++] = left[i++];
        else result[k++] = right[j++];
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
  javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
  csharp: `public static int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    int[] left = arr.Take(mid).ToArray();
    int[] right = arr.Skip(mid).ToArray();
    return Merge(MergeSort(left), MergeSort(right));
}
public static int[] Merge(int[] left, int[] right) {
    int[] result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;
    while (i < left.Length && j < right.Length) {
        if (left[i] <= right[j]) result[k++] = left[i++];
        else result[k++] = right[j++];
    }
    while (i < left.Length) result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];
    return result;
}`
};

const MergeSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [steps, setSteps] = useState(mergeSortSteps(defaultArray));
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
    const arr = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    setSteps(mergeSortSteps(arr));
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

  const current = steps[step];

  // Color logic for bars
  const getBarColor = (idx: number) => {
    if (current.mergedRange && idx >= current.mergedRange[0] && idx <= current.mergedRange[1]) {
      return '#5cb85c'; // green for merged
    }
    if (current.leftRange && idx >= current.leftRange[0] && idx <= current.leftRange[1]) {
      return '#4f8cff'; // blue for left
    }
    if (current.rightRange && idx >= current.rightRange[0] && idx <= current.rightRange[1]) {
      return '#f0ad4e'; // orange for right
    }
    return undefined;
  };

  // Simulation note
  const getSimulationNote = () => {
    if (step === 0) return "Initial array state";
    if (step === steps.length - 1) return "Array is now sorted!";
    if (current.mergedRange) {
      return `Step ${step}: Merging elements from index ${current.mergedRange[0]} to ${current.mergedRange[1]}.`;
    }
    if (current.leftRange && current.rightRange) {
      return `Step ${step}: Dividing array into left [${current.leftRange[0]}-${current.leftRange[1]}] and right [${current.rightRange[0]}-${current.rightRange[1]}] subarrays.`;
    }
    return `Step ${step}: Processing merge sort.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Merge Sort Visualizer</h1>
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
            Merge Sort is a divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems
            of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems
            are then combined to give a solution to the original problem.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Divide:</strong> Split the array into two halves</li>
            <li><strong>Conquer:</strong> Recursively sort the two halves</li>
            <li><strong>Merge:</strong> Combine the two sorted halves into a single sorted array</li>
            <li>Repeat until the entire array is sorted</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Stable sort (preserves relative order of equal elements)</li>
            <li>Predictable performance (always O(n log n))</li>
            <li>Not in-place (requires extra space)</li>
            <li>Excellent for large datasets</li>
            <li>Used in external sorting algorithms</li>
            <li>Parallelizable algorithm</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n log n) average/worst/best</li>
            <li>Space: O(n)</li>
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
            <div style={{ margin: '1rem 0', fontSize: '0.95rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
              <span><span style={{ display: 'inline-block', width: 18, height: 18, background: '#4f8cff', borderRadius: 3, marginRight: 6 }} /> Left Subarray</span>
              <span><span style={{ display: 'inline-block', width: 18, height: 18, background: '#f0ad4e', borderRadius: 3, marginRight: 6 }} /> Right Subarray</span>
              <span><span style={{ display: 'inline-block', width: 18, height: 18, background: '#5cb85c', borderRadius: 3, marginRight: 6 }} /> Merged Section</span>
            </div>
            <div className="array-container">
              {current.array.map((num, idx) => (
                <div key={idx} className="array-bar" style={{ height: `${num * 30}px`, background: getBarColor(idx) }}>
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
              {mergeSortCode[activeTab as keyof typeof mergeSortCode]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeSortPage; 