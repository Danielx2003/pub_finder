import { useEffect, useCallback } from "react";

type UseInfiniteScrollParams = {
    trigger: React.Dispatch<React.SetStateAction<number>>
    screenId: string
    currentPage: number | undefined
    maxPage: number | undefined
    loading: boolean
}

const useInfiniteScroll = (params: UseInfiniteScrollParams) => {
    const handleScroll = useCallback(() => {
        const root = document.getElementById(params.screenId);
        if (!root || params.loading) return;

        const bottom =
            window.scrollY + window.innerHeight >= root.clientHeight;

        if (bottom &&
            params.currentPage &&
            params.maxPage &&
            params.currentPage + 1 <= params.maxPage
        ) {
            params.trigger(prev => prev+1);
        }
    }, [params.screenId, params.currentPage, params.maxPage]);

    useEffect(() => {       
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
}

export default useInfiniteScroll;