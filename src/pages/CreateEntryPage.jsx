import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCompendium } from '../context/CompendiumContext'
import Nav from '../components/Nav'
import ItemForm from '../components/ItemForm'

export default function CreateEntryPage() {
  const { game } = useParams()
  const navigate = useNavigate()
  const { createEntry } = useCompendium()

  useEffect(() => {
    document.body.dataset.game = game
    return () => { delete document.body.dataset.game }
  }, [game])

  const handleSave = (entryData) => {
    // Generate a unique ID for the new local item (using negative numbers to avoid ID collision with API)
    const newId = -Date.now()
    createEntry({ ...entryData, id: newId })
    navigate(`/${game}/entries`, { replace: true })
  }

  const handleCancel = () => {
    navigate(`/${game}/entries`)
  }

  return (
    <>
      <Nav game={game} backLink={`/${game}/entries`} hideLinks title="Create Entry" />
      <main className="detail-page" style={{ display: 'flex', justifyContent: 'center' }}>
        <div id="compendium-detail" style={{ width: '100%', marginTop: '20px' }}>
          <Link to={`/${game}/entries`} className="detail-back-button detail-back-button--mobile" aria-label="Back to entries">
            <i className="mdi mdi-arrow-left"></i>
            <span>Back</span>
          </Link>
          <h2 className="detail-title">New Entry</h2>
          <ItemForm isCreate game={game} onSave={handleSave} onCancel={handleCancel} />
        </div>
      </main>
    </>
  )
}
