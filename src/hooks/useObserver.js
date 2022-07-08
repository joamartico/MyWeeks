import { useEffect, useMemo, useState } from 'react';

export function useObserver(ref) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    });

    observer.observe(ref.current);
    
    return () => observer.unobserve(ref.current);
  }, [ref]);

  return isInViewport;
}
