import { NavLink, Link } from 'react-router-dom'
import './Nav.css'

const GAME_LABELS = {
  botw: 'Breath of the Wild',
  totk: 'Tears of the Kingdom',
}

export default function Nav({ game, backLink, hideLinks }) {
  const otherGame = game === 'botw' ? 'totk' : 'botw'

  return (
    <nav className={`list-nav list-nav--${game} ${hideLinks ? 'list-nav--centered' : ''}`}>
      <div className="list-nav-left">
        {backLink && (
          <Link to={backLink} className="nav-link nav-link--back">
            <i className="mdi mdi-arrow-left"></i> Back
          </Link>
        )}
      </div>
      {!hideLinks && (
        <div className="list-nav-links">
          <NavLink to={`/${otherGame}/entries`} className={`nav-link nav-link--other nav-link--${otherGame}`}>
            {GAME_LABELS[otherGame]}
          </NavLink>
          <NavLink to={`/${game}/entries/create`} className={`nav-link nav-link--create nav-link--${game}`}>
            + Create Entry
          </NavLink>
        </div>
      )}
    </nav>
  )
}
