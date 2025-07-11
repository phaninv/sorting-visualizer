import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sorts = [
  { name: 'Bubble', path: '/bubble', icon: '🫧' },
  { name: 'Bucket', path: '/bucket', icon: '🪣' },
  { name: 'Counting', path: '/counting', icon: '🔢' },
  { name: 'Heap', path: '/heap', icon: '🌳' },
  { name: 'Insertion', path: '/insertion', icon: '📝' },
  { name: 'Merge', path: '/merge', icon: '🔀' },
  { name: 'Odd-Even', path: '/oddeven', icon: '⚡' },
  { name: 'Quick', path: '/quick', icon: '⚡' },
  { name: 'Radix', path: '/radix', icon: '🔢' },
  { name: 'Selection', path: '/selection', icon: '🎯' },
  { name: 'Shell', path: '/shell', icon: '🐚' },
  { name: 'Sleep', path: '/sleep', icon: '😴' },
  { name: 'Stooge', path: '/stooge', icon: '🤪' },
  { name: 'TimSort', path: '/timsort', icon: '⚙️' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to active sort when location changes
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [location.pathname]);

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      background: '#fff',
      borderBottom: '2px solid #e0e0e0',
      padding: isMobile ? '0.5rem 0' : '1rem 0',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 0.5rem' : '0 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0.5rem' : '1rem'
      }}>
        {/* Home Button - Distinct, not circular */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.25rem' : '0.5rem',
            padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
            background: location.pathname === '/' ? '#4f8cff' : '#f8f9fa',
            color: location.pathname === '/' ? 'white' : '#333',
            textDecoration: 'none',
            borderRadius: '999px',
            fontWeight: 'bold',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            transition: 'all 0.2s ease',
            border: '2px solid transparent',
            minWidth: isMobile ? 'auto' : 'auto',
            outline: 'none',
            userSelect: 'none',
            boxShadow: location.pathname === '/' ? '0 2px 8px rgba(79, 140, 255, 0.3)' : 'none',
            marginRight: isMobile ? '0.3rem' : '0.7rem',
          }}
          onMouseEnter={(e) => {
            if (location.pathname !== '/') {
              e.currentTarget.style.background = '#e3f2fd';
              e.currentTarget.style.borderColor = '#4f8cff';
            }
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== '/') {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.borderColor = 'transparent';
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          🏠 {!isMobile && 'Home'}
        </Link>

        {/* Sort Icons - Circular, horizontally scrollable */}
        <div 
          ref={scrollContainerRef}
          data-scroll-container
          style={{
            display: 'flex',
            gap: isMobile ? '0.25rem' : '0.5rem',
            overflowX: 'auto',
            padding: isMobile ? '0.25rem 0' : '0.5rem 0',
            flex: 1,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            alignItems: 'center',
          }}
        >
          {sorts.map(sort => {
            const isActive = location.pathname === sort.path;
            return (
              <Link 
                key={sort.path} 
                to={sort.path}
                data-active={isActive}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: isMobile ? '0.1rem' : '0.25rem',
                  width: isMobile ? '44px' : '54px',
                  height: isMobile ? '44px' : '54px',
                  minWidth: isMobile ? '44px' : '54px',
                  minHeight: isMobile ? '44px' : '54px',
                  borderRadius: '50%',
                  background: isActive ? '#4f8cff' : '#f8f9fa',
                  color: isActive ? 'white' : '#333',
                  textDecoration: 'none',
                  border: isActive ? '3px solid #2d5aa0' : '2px solid transparent',
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  fontWeight: '500',
                  outline: 'none',
                  boxShadow: isActive ? '0 2px 8px rgba(79, 140, 255, 0.3)' : 'none',
                  userSelect: 'none',
                  transition: 'all 0.2s',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#e3f2fd';
                    e.currentTarget.style.borderColor = '#4f8cff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', lineHeight: 1 }}>{sort.icon}</span>
                <span style={{ 
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  textAlign: 'center',
                  lineHeight: '1',
                  marginTop: '0.1rem',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  pointerEvents: 'none',
                }}>
                  {sort.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* No scroll arrows anymore */}
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        [data-scroll-container]::-webkit-scrollbar {
          display: none;
        }
        [data-scroll-container] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        [data-scroll-container] a:focus,
        [data-scroll-container] button:focus {
          outline: none !important;
        }
        [data-scroll-container] a,
        [data-scroll-container] button {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default Navigation; 