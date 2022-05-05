import { useEffect, useRef } from "react";

export default function usePrevious(value: any) {
  const previous = useRef(null);

  useEffect(() => {
    previous.current = value;
  }, [value]);
  return previous.current;
}
