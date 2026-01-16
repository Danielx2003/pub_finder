import { useEffect, useCallback } from "react";

type UseInfiniteScrollParams = {
    trigger: React.Dispatch<React.SetStateAction<number>>
    screenId?: string
    currentPage: number | undefined
    maxPage: number | undefined
    loading: boolean
}

const useInfiniteScroll = ({
    trigger,
    screenId = 'root',
    currentPage,
    maxPage,
    loading
}: UseInfiniteScrollParams) => {
    const handleScroll = useCallback(() => {
        const root = document.getElementById(screenId);
        if (!root || loading) return;

        const bottom =
            window.scrollY + window.innerHeight >= root.clientHeight;

        if (bottom &&
            currentPage &&
            maxPage &&
            currentPage + 1 <= maxPage
        ) {
            trigger(prev => prev+1);
        }
    }, [screenId, currentPage, maxPage]);

    useEffect(() => {       
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
}

export default useInfiniteScroll;