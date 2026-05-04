import { Link } from 'react-router-dom'
import './Item.css'

export default function Item({ item, game }) {
  return (
    <Link to={`/${game}/entries/${item.id}`} className="compendium-item">
      <img src={item.image} alt="Compendium item illustration" loading="lazy" />
      <h3>{item.name}</h3>
    </Link>
  )
}
