// useInfiniteScroll.tsx
import { useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  isFetching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  isFetching,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetching, hasMore, onLoadMore],
  );

  return { lastElementRef };
};

export default useInfiniteScroll;
