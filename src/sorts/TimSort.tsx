import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 21, 7, 23, 19, 10, 12, 15];
const RUN = 32;

function insertionSort(arr: number[], left: number, right: number, steps: number[][], highlights: number[][]) {
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;
    let highlight = [i];
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      highlight.push(j);
      j--;
    }
    arr[j + 1] = temp;
    steps.push([...arr]);
    highlights.push([...highlight]);
  }
}

function merge(arr: number[], l: number, m: number, r: number, steps: number[][], highlights: number[][]) {
  let len1 = m - l + 1, len2 = r - m;
  let left = new Array(len1);
  let right = new Array(len2);
  for (let x = 0; x < len1; x++) left[x] = arr[l + x];
  for (let x = 0; x < len2; x++) right[x] = arr[m + 1 + x];
  let i = 0, j = 0, k = l;
  let highlight = [];
  while (i < len1 && j < len2) {
    highlight = [k];
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    steps.push([...arr]);
    highlights.push([...highlight]);
  }
  while (i < len1) {
    arr[k++] = left[i++];
    steps.push([...arr]);
    highlights.push([k - 1]);
  }
  while (j < len2) {
    arr[k++] = right[j++];
    steps.push([...arr]);
    highlights.push([k - 1]);
  }
}

function timSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  let n = a.length;
  steps.push([...a]);
  highlights.push([]);
  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    insertionSort(a, i, Math.min(i + RUN - 1, n - 1), steps, highlights);
  }
  // Merge subarrays
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min((left + 2 * size - 1), (n - 1));
      if (mid < right) merge(a, left, mid, right, steps, highlights);
    }
  }
  return { steps, highlights };
}

const codeSamples = {
  Python: `def timsort(arr):
    RUN = 32
    n = len(arr)
    
    # Sort individual subarrays of size RUN
    for i in range(0, n, RUN):
        insertion_sort(arr, i, min(i + RUN - 1, n - 1))
    
    # Merge subarrays
    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size = 2 * size
    
    return arr

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        temp = arr[i]
        j = i - 1
        while j >= left and arr[j] > temp:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = temp

def merge(arr, l, m, r):
    len1, len2 = m - l + 1, r - m
    left, right = [], []
    
    for i in range(len1):
        left.append(arr[l + i])
    for j in range(len2):
        right.append(arr[m + 1 + j])
    
    i = j = 0
    k = l
    
    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1
    
    while i < len1:
        arr[k] = left[i]
        i += 1
        k += 1
    
    while j < len2:
        arr[k] = right[j]
        j += 1
        k += 1

# Example usage
arr = [5, 21, 7, 23, 19, 10, 12, 15]
print(timsort(arr))
`,
  Java: `public class TimSort {
    private static final int RUN = 32;
    
    public static void timSort(int[] arr) {
        int n = arr.length;
        
        // Sort individual subarrays of size RUN
        for (int i = 0; i < n; i += RUN) {
            insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
        }
        
        // Merge subarrays
        for (int size = RUN; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) {
                    merge(arr, left, mid, right);
                }
            }
        }
    }
    
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }
    
    private static void merge(int[] arr, int l, int m, int r) {
        int len1 = m - l + 1, len2 = r - m;
        int[] left = new int[len1];
        int[] right = new int[len2];
        
        for (int i = 0; i < len1; i++) {
            left[i] = arr[l + i];
        }
        for (int j = 0; j < len2; j++) {
            right[j] = arr[m + 1 + j];
        }
        
        int i = 0, j = 0, k = l;
        while (i < len1 && j < len2) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < len1) {
            arr[k++] = left[i++];
        }
        while (j < len2) {
            arr[k++] = right[j++];
        }
    }
}

// Example usage
int[] arr = {5, 21, 7, 23, 19, 10, 12, 15};
TimSort.timSort(arr);
`,
  JavaScript: `function timSort(arr) {
  const RUN = 32;
  const n = arr.length;
  
  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  
  // Merge subarrays
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        merge(arr, left, mid, right);
      }
    }
  }
  
  return arr;
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

function merge(arr, l, m, r) {
  let len1 = m - l + 1, len2 = r - m;
  let left = new Array(len1);
  let right = new Array(len2);
  
  for (let i = 0; i < len1; i++) {
    left[i] = arr[l + i];
  }
  for (let j = 0; j < len2; j++) {
    right[j] = arr[m + 1 + j];
  }
  
  let i = 0, j = 0, k = l;
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }
  
  while (i < len1) {
    arr[k++] = left[i++];
  }
  while (j < len2) {
    arr[k++] = right[j++];
  }
}

// Example usage
const arr = [5, 21, 7, 23, 19, 10, 12, 15];

`,
  'C#': `public static class TimSort {
    private const int RUN = 32;
    
    public static void Sort(int[] arr) {
        int n = arr.Length;
        
        // Sort individual subarrays of size RUN
        for (int i = 0; i < n; i += RUN) {
            InsertionSort(arr, i, Math.Min(i + RUN - 1, n - 1));
        }
        
        // Merge subarrays
        for (int size = RUN; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.Min(left + 2 * size - 1, n - 1);
                if (mid < right) {
                    Merge(arr, left, mid, right);
                }
            }
        }
    }
    
    private static void InsertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }
    
    private static void Merge(int[] arr, int l, int m, int r) {
        int len1 = m - l + 1, len2 = r - m;
        int[] left = new int[len1];
        int[] right = new int[len2];
        
        for (int i = 0; i < len1; i++) {
            left[i] = arr[l + i];
        }
        for (int j = 0; j < len2; j++) {
            right[j] = arr[m + 1 + j];
        }
        
        int i = 0, j = 0, k = l;
        while (i < len1 && j < len2) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < len1) {
            arr[k++] = left[i++];
        }
        while (j < len2) {
            arr[k++] = right[j++];
        }
    }
}

// Example usage
int[] arr = { 5, 21, 7, 23, 19, 10, 12, 15 };
TimSort.Sort(arr);
`,
};

const TimSort: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(timSortSteps(defaultArray));
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
    setSortData(timSortSteps(arr));
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
      return `Step ${step}: Processing elements in TimSort. Highlighted elements are being compared or merged as part of the hybrid insertion sort and merge sort algorithm.`;
    }
    return `Step ${step}: Continuing with TimSort's hybrid approach of insertion sort for small runs and merge sort for combining runs.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>TimSort Visualizer</h1>
      
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
            TimSort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. 
            It divides the array into small chunks (runs), sorts them using insertion sort, and then merges the runs using merge sort.
          </p>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Divide the array into runs of size RUN (e.g., 32)</li>
            <li>Sort each run using insertion sort</li>
            <li>Merge runs using merge sort until the array is sorted</li>
            <li>Combine the sorted runs efficiently</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Stable and adaptive algorithm</li>
            <li>Used in Python and JavaScript standard sorts</li>
            <li>Efficient for real-world data</li>
            <li>Hybrid of insertion sort and merge sort</li>
            <li>Optimized for partially sorted arrays</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n log n) average/worst, O(n) best</li>
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

export default TimSort; 