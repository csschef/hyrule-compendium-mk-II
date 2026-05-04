import { useState, useEffect, useRef } from 'react'
import './ListPage.css'
import { useParams } from 'react-router-dom'
import { getAll } from '../api/dataApi'
import { useCompendium } from '../context/CompendiumContext'
import Nav from '../components/Nav'
import ItemList from '../components/ItemList'
import loadingGif from '../assets/loading.gif'

const ITEMS_PER_PAGE = 20

const GAME_LABELS = {
  botw: 'Breath of the Wild',
  totk: 'Tears of the Kingdom',
}

const CATEGORIES = ['all', 'creatures', 'equipment', 'materials', 'monsters', 'treasure']

export default function ListPage() {
  const { game } = useParams()
  const { deletedIds, updatedEntries, createdEntries } = useCompendium()

  const [allEntries, setAllEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState('all')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)

  // Set body background based on game
  useEffect(() => {
    document.body.dataset.game = game
    return () => { delete document.body.dataset.game }
  }, [game])

  // Fetch entries whenever the game changes
  useEffect(() => {
    setLoading(true)
    setError(null)
    setSearch('')
    setCurrentPage(1)
    setCategory('all')

    getAll(game)
      .then(data => setAllEntries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [game])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Merge fetched entries with context overrides
  const entries = [
    ...createdEntries,
    ...allEntries.map(e =>
      updatedEntries[e.id] ? { ...e, ...updatedEntries[e.id] } : e
    ),
  ].filter(e => !deletedIds.has(Number(e.id)))

  // Filter by search term and category
  const filtered = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || entry.category === category
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    setCurrentPage(1)
    setDropdownOpen(false)
  }

  const handleNext = () => {
    setCurrentPage(p => p + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setCurrentPage(p => p - 1)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const categoryLabel = category === 'all'
    ? 'All Categories'
    : category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <>
      <Nav game={game} />

      <main className="list-page">
        <header className="list-header">
          <h1 className="title gold-text list-title">{GAME_LABELS[game]}</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search entries..."
              value={search}
              onChange={handleSearch}
            />
            <div
              className={`dropdown${dropdownOpen ? ' open' : ''}`}
              ref={dropdownRef}
            >
              <button
                className="dropbtn"
                onClick={() => setDropdownOpen(o => !o)}
              >
                {categoryLabel}
              </button>
              <div className="dropdown-content">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className="category-btn"
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {loading && (
          <div className="loading-wrapper">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <ItemList items={paginated} game={game} />

            {totalPages > 1 && (
              <div id="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Previous
                </button>
                <span id="page-number">{currentPage} / {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}
