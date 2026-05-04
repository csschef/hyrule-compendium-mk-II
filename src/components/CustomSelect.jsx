import { useState, useEffect, useRef } from 'react'

export default function CustomSelect({ name, value, onChange, options, placeholder = "Select..." }) {
  const [isOpen, setIsOpen] = useState(false)
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

  const selectedOption = options.find(opt => String(opt.value) === String(value))
  const displayLabel = selectedOption && selectedOption.value !== '' ? selectedOption.label : placeholder

  return (
    <div className="custom-select" ref={containerRef}>
      <div 
        className={`custom-select__value edit-input ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        <i className={`mdi mdi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map(opt => {
            if (opt.value === '') return null; // hide placeholder from dropdown options
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
          })}
        </div>
      )}
    </div>
  )
}
