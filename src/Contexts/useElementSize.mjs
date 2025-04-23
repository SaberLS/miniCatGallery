import React, {useEffect, useState, useRef} from "react";

const useElementSize = (ref, debounce = 250) => {
  const [size, setSize] = useState({width: 0, height: 0});
  const timeout = useRef(null);

  useEffect(() => {
    if(!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;

      if(timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSize({width, height});
      }, debounce)
    })

      observer.observe(ref.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeout.current)
    }
  }, [ref, debounce]);

  return size;
}

export default useElementSize;
