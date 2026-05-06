import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getById } from '../api/dataApi'
import { useCompendium } from '../context/CompendiumContext'
import Nav from '../components/Nav'
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'
import loadingGif from '../assets/loading.gif'

export default function DetailPage() {
  const { game, id } = useParams()
  const navigate = useNavigate()
  const { deletedIds, updatedEntries, createdEntries, deleteEntry, updateEntry } = useCompendium()

  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 0 = idle, 1 = awaiting confirmation
  const [deleteStep, setDeleteStep] = useState(0)

  // Edit state
  const [isEditing, setIsEditing] = useState(false)

  // Set body background to match game
  useEffect(() => {
    document.body.dataset.game = game
    return () => { delete document.body.dataset.game }
  }, [game])

  // Fetch entry; redirect if it has been deleted
  useEffect(() => {
    if (deletedIds.has(Number(id))) {
      navigate(`/${game}/entries`, { replace: true })
      return
    }

    setLoading(true)
    setError(null)
    setDeleteStep(0)
    setIsEditing(false)

    // Check if this is a locally created entry (not from the API)
    const localEntry = createdEntries.find(e => String(e.id) === String(id))
    if (localEntry) {
      setEntry(localEntry)
      setLoading(false)
      return
    }

    getById(id, game)
      .then(data => {
        setEntry(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, game])

  // Merge API entry with any local overrides
  const mergedEntry = entry
    ? mergeEntry(entry, updatedEntries[Number(id)])
    : null

  // ── Handlers ────────────────────────────────────────────

  function handleDeleteClick() {
    if (deleteStep === 0) {
      setDeleteStep(1)
    } else {
      deleteEntry(id)
      navigate(`/${game}/entries`, { replace: true })
    }
  }

  function handleEditSave(updatedData) {
    // The ItemForm returns a properly structured object based on category.
    // We just pass it directly to context along with id.
    updateEntry(id, updatedData)
    setIsEditing(false)
  }

  function handleEditCancel() {
    setIsEditing(false)
  }

  // ── Render ───────────────────────────────────────────────

  return (
    <>
      <Nav
        game={game}
        backLink={`/${game}/entries`}
        hideLinks
      />

      <main className="detail-page">
        {loading && (
          <div className="loading-wrapper">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        )}

        {error && (
          <div className="error-box"><p>{error}</p></div>
        )}

        {!loading && !error && mergedEntry && (
          <>

            {isEditing ? (
              <div id="compendium-detail">
                <Link to={`/${game}/entries`} className="detail-back-button detail-back-button--mobile" aria-label="Back to entries">
                  <i className="mdi mdi-arrow-left"></i>
                  <span>Back</span>
                </Link>
                <h2 className="detail-title">Editing: {mergedEntry.name}</h2>
                <ItemForm
                  initialData={mergedEntry}
                  game={game}
                  onSave={handleEditSave}
                  onCancel={handleEditCancel}
                  isCreate={false}
                />
              </div>
            ) : (
              <ItemDetails
                entry={mergedEntry}
                backLink={`/${game}/entries`}
                actions={
                  deleteStep === 0 ? (
                    <>
                      <button
                        className={`btn btn--action btn--icon btn--edit-sm btn--${game}`}
                        onClick={() => setIsEditing(true)}
                        title="Edit Entry"
                      >
                        <i className="mdi mdi-pencil"></i>
                      </button>
                      <button
                        className="btn btn--action btn--icon btn--delete-sm"
                        onClick={handleDeleteClick}
                        title="Delete Entry"
                      >
                        <i className="mdi mdi-trash-can-outline"></i>
                      </button>
                    </>
                  ) : (
                    <div className="delete-confirm delete-confirm--icon-only">
                      <button
                        className="btn btn--action btn--icon btn--delete-confirm-sm"
                        onClick={handleDeleteClick}
                        title="Confirm Delete"
                      >
                        <i className="mdi mdi-check"></i>
                      </button>
                      <button
                        className="btn btn--action btn--icon btn--cancel-sm"
                        onClick={() => setDeleteStep(0)}
                        title="Cancel"
                      >
                        <i className="mdi mdi-close"></i>
                      </button>
                    </div>
                  )
                }
              />
            )}
          </>
        )}
      </main>
    </>
  )
}



// Merge an API entry with local overrides
function mergeEntry(entry, overrides) {
  if (!overrides) return entry
  const merged = { ...entry, ...overrides }
  if (overrides.properties) {
    merged.properties = { ...entry.properties, ...overrides.properties }
  }
  return merged
}
