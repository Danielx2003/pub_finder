import { useEffect, useState } from "react"

const useDebounce = (value: any, delay: number = 500): any => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(id)
        }
    }, [value, delay])

    return debouncedValue
}
export default useDebounce