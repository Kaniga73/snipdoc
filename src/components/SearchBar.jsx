import { useEffect, useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({
  value,
  onChange,
  totalCount,
  filteredCount,
}) {
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  useEffect(() => {
    const id = setTimeout(() => {
      if (onChange) {
        onChange(inputValue)
      }
    }, 300)

    return () => clearTimeout(id)
  }, [inputValue, onChange])

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="sd-search">
      <div className="sd-search__input-wrap">
        <span className="sd-search__icon">🔍</span>
        <input
          type="text"
          className="sd-search__input"
          placeholder="Search by title, code, or tags..."
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <div className="sd-search__meta">
        {typeof filteredCount === 'number' && typeof totalCount === 'number' && (
          <span className="sd-search__count">
            Showing {filteredCount} of {totalCount} snippets
          </span>
        )}
      </div>
    </div>
  )
}

export default SearchBar


