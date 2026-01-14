import { type SearchBarProps } from "../../types/searchbar/SearchBarTypes"

export default function SearchBar({searchValue, setSearchValue, placeholder = 'Search', className}: SearchBarProps) { 
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <input
            className={className}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleTyping}
        />
    )
}