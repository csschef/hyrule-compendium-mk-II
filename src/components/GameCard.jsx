import { Link } from 'react-router-dom'
import './GameCard.css'

export default function GameCard({ to, logo, logoAlt, title, description, variant }) {
  return (
    <Link to={to} className={`game-card ${variant}-card`}>
      <div className="game-card-logo-wrapper">
        <img src={logo} alt="" className="game-card-logo" />
      </div>
      <div className="game-card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="game-card-arrow">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </Link>
  )
}
