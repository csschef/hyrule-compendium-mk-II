import CustomSelect from './CustomSelect'

export default function TagSelector({ items, available, onAdd, onRemove, placeholder, capitalize = false }) {
  const fmt = (s) => capitalize ? s.charAt(0).toUpperCase() + s.slice(1) : s

  return (
    <div className="tag-selector">
      <div className="tag-selector__tags">
        {items.map(item => (
          <span key={item} className="tag">
            {fmt(item)}
            <button type="button" onClick={() => onRemove(item)}>
              <i className="mdi mdi-close"></i>
            </button>
          </span>
        ))}
      </div>
      <CustomSelect 
        value="" 
        onChange={onAdd} 
        placeholder={placeholder}
        options={[
          { value: '', label: placeholder },
          ...available.map(opt => ({ value: opt, label: fmt(opt) }))
        ]}
      />
    </div>
  )
}
