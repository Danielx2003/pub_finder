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
            screenId == 'root' ? window.scrollY + window.innerHeight >= root.clientHeight :
            root.scrollTop > 99;

        if (bottom &&
            currentPage &&
            maxPage &&
            currentPage + 1 <= maxPage
        ) {
            trigger(prev => prev+1);
        }
    }, [trigger, screenId, currentPage, maxPage, loading]);

    useEffect(() => {
        if (screenId == 'root') {
            window.addEventListener('scroll', handleScroll);
        } else {
            document.getElementById(screenId)?.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (screenId == 'root') {
                window.removeEventListener('scroll', handleScroll);
            } else {
                document.getElementById(screenId)?.removeEventListener('scroll', handleScroll)
            }
        };
    }, [handleScroll]);
}

export default useInfiniteScroll;