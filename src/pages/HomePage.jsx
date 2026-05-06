import { useEffect } from 'react'
import './HomePage.css'
import GameCard from '../components/GameCard'
import botwLogo from '../assets/img/botw.png'
import totkLogo from '../assets/img/totk.png'

export default function HomePage() {
  useEffect(() => {
    document.body.dataset.page = 'home'
    return () => { delete document.body.dataset.page }
  }, [])

  return (
    <main className="home-page">
      <header className="home-header">
        <h1 className="title gold-text">Hyrule Compendium</h1>
        <h2 className="gold-text">The encyclopedia of all the in-game interactive items in Breath of the Wild and Tears of the Kingdom</h2>
      </header>

      <section className="game-select">
        <GameCard
          to="/botw/entries"
          logo={botwLogo}
          logoAlt="Breath of the Wild logo"
          title="Breath of the Wild"
          description="Explore creatures, equipment and materials from across Hyrule"
          variant="botw"
        />
        <GameCard
          to="/totk/entries"
          logo={totkLogo}
          logoAlt="Tears of the Kingdom logo"
          title="Tears of the Kingdom"
          description="Discover the inhabitants and artifacts of the sky islands and depths"
          variant="totk"
        />
      </section>
    </main>
  )
}
