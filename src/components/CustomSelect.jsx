import { useState, useEffect, useLayoutEffect, useRef } from 'react'

export default function CustomSelect({ name, value, onChange, options, placeholder = "Select...", searchable = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openUpward, setOpenUpward] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('')
      setOpenUpward(false)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current) return

    const updateDirection = () => {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      setOpenUpward(spaceBelow < 280 && spaceAbove > spaceBelow)
    }

    updateDirection()
    window.addEventListener('resize', updateDirection)
    window.addEventListener('scroll', updateDirection, true)

    return () => {
      window.removeEventListener('resize', updateDirection)
      window.removeEventListener('scroll', updateDirection, true)
    }
  }, [isOpen])

  const selectedOption = options.find(opt => String(opt.value) === String(value))
  const displayLabel = selectedOption && selectedOption.value !== '' ? selectedOption.label : placeholder
  const filteredOptions = options.filter(opt => {
    if (opt.value === '') return false
    if (!searchable || !searchTerm) return true
    return opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="custom-select" ref={containerRef}>
      <div 
        className={`custom-select__value edit-input ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(open => !open)}
      >
        <span>{displayLabel}</span>
        <i className={`mdi mdi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className={`custom-select__dropdown ${openUpward ? 'custom-select__dropdown--up' : ''}`}>
          {searchable && (
            <input
              className="custom-select__search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to filter..."
              autoFocus
            />
          )}
          {filteredOptions.length > 0 ? filteredOptions.map(opt => {
            return (
              <div 
                key={opt.value} 
                className={`custom-select__option ${String(opt.value) === String(value) ? 'selected' : ''}`}
                onClick={() => {
                  if (name) {
                    onChange({ target: { name, value: opt.value } })
                  } else {
                    // For TagSelector which expects an event with target.value
                    onChange({ target: { value: opt.value } })
                  }
                  setIsOpen(false)
                }}
              >
                {opt.label}
              </div>
            )
          }) : (
            <div className="custom-select__empty">No matches</div>
          )}
        </div>
      )}
    </div>
  )
}
