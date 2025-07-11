import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';

const defaultArray = [5, 3, 8, 4, 2, 7, 1, 6];

function sleepSortSteps(arr: number[]) {
  const steps: number[][] = [];
  const highlights: number[][] = [];
  let a = [...arr];
  steps.push([...a]);
  highlights.push([]);
  // Simulate sleep sort: sort by value (simulate delay)
  let sorted = [...a].sort((x, y) => x - y);
  for (let i = 0; i < sorted.length; i++) {
    steps.push(sorted.slice(0, i + 1).concat(a.slice(i + 1)));
    highlights.push([i]);
  }
  return { steps, highlights };
}

const codeSamples = {
  Python: `import threading
import time

def sleep_sort(arr):
    result = []
    threads = []
    
    def worker(n):
        time.sleep(n)
        result.append(n)
    
    for num in arr:
        thread = threading.Thread(target=worker, args=(num,))
        threads.append(thread)
        thread.start()
    
    for thread in threads:
        thread.join()
    
    return result

# Example usage
arr = [5, 3, 8, 4, 2, 7, 1, 6]
print(sleep_sort(arr))
`,
  Java: `import java.util.concurrent.*;

public class SleepSort {
    public static void sleepSort(int[] arr) {
        ExecutorService executor = Executors.newFixedThreadPool(arr.length);
        List<Integer> result = Collections.synchronizedList(new ArrayList<>());
        
        for (int num : arr) {
            executor.submit(() -> {
                try {
                    Thread.sleep(num * 100);
                    result.add(num);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        executor.shutdown();
        try {
            executor.awaitTermination(10, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// Example usage
int[] arr = {5, 3, 8, 4, 2, 7, 1, 6};
sleepSort(arr);
`,
  JavaScript: `function sleepSort(arr) {
  return new Promise((resolve) => {
    const result = [];
    let completed = 0;
    
    arr.forEach(num => {
      setTimeout(() => {
        result.push(num);
        completed++;
        if (completed === arr.length) {
          resolve(result);
        }
      }, num * 100);
    });
  });
}

// Example usage
const arr = [5, 3, 8, 4, 2, 7, 1, 6];

`,
  'C#': `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public static class SleepSort {
    public static async Task<List<int>> SleepSortAsync(int[] arr) {
        var result = new List<int>();
        var tasks = new List<Task>();
        
        foreach (int num in arr) {
            tasks.Add(Task.Run(async () => {
                await Task.Delay(num * 100);
                lock (result) {
                    result.Add(num);
                }
            }));
        }
        
        await Task.WhenAll(tasks);
        return result;
    }
}

// Example usage
int[] arr = { 5, 3, 8, 4, 2, 7, 1, 6 };
var result = await SleepSort.SleepSortAsync(arr);
`,
};

const SleepSortPage: React.FC = () => {
  const [input, setInput] = useState(defaultArray.join(", "));
  const [{ steps, highlights }, setSortData] = useState(sleepSortSteps(defaultArray));
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
    setSortData(sleepSortSteps(arr));
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
      const highlightedIndex = currentHighlights[0];
      const highlightedValue = steps[step][highlightedIndex];
      return `Step ${step}: Element ${highlightedValue} has "woken up" and been placed in its sorted position. In real sleep sort, this would happen after a delay proportional to the element's value.`;
    }
    return `Step ${step}: Simulating the sleep sort process where elements wake up in order of their values.`;
  };

  return (
    <div className="App">
      <Navigation />
      <h1>Sleep Sort Visualizer</h1>
      
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
            Sleep Sort is a joke sorting algorithm that works by spawning a thread for each number in the array, 
            sleeping for a duration proportional to the number, and then outputting the number. The numbers are 
            printed in sorted order as their respective timers expire. This is highly impractical and not recommended for real use!
          </p>
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '4px',
            color: '#856404'
          }}>
            <strong>⚠️ Warning:</strong> Sleep Sort is for fun only! Please do not use in production or with negative/large numbers!
          </div>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Algorithm Steps:
          </h3>
          <ol style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>For each number, start a timer proportional to its value</li>
            <li>When the timer expires, output the number</li>
            <li>Numbers are output in sorted order</li>
            <li>Smaller numbers wake up first</li>
          </ol>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Key Characteristics:
          </h3>
          <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            <li>Not practical for real-world use</li>
            <li>Fun and creative algorithm</li>
            <li>Not suitable for negative or large numbers</li>
            <li>Uses threading and timing</li>
            <li>Educational and entertaining</li>
          </ul>
          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Complexity:
          </h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Time: O(n + max(input)) (theoretically)</li>
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

export default SleepSortPage; 