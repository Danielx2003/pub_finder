type SearchBarProps = {
    searchValue: string,
    setSearchValue: Function,
    placeholder: string
}

export default function SearchBar({searchValue, setSearchValue, placeholder}: SearchBarProps) {   
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleTyping}
        />
    )
}