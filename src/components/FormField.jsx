export default function FormField({ icon, label, children }) {
  return (
    <div className="form-field">
      <span className="form-field__label">
        <i className={`mdi ${icon}`}></i>
        {label}
      </span>
      {children}
    </div>
  )
}
