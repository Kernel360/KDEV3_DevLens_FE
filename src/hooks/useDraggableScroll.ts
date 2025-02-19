import { useRef, useState, MouseEvent } from "react";

interface UseDraggableScrollReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  style: string;
}

export function useDraggableScroll(): UseDraggableScrollReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (ref.current?.offsetLeft ?? 0));
    setScrollLeft(ref.current?.scrollLeft ?? 0);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (ref.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 2;
    if (ref.current) {
      ref.current.scrollLeft = scrollLeft - walk;
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave: onMouseUp,
    style: "cursor-grab active:cursor-grabbing",
  };
}
