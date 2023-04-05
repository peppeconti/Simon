import { useState, useEffect } from 'react';

const useHeight = (query) => {
    const [height, setHeight] = useState('100vh');

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);
  
    return matches;
}

export { useHeight }