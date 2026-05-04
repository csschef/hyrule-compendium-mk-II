import { createContext, useContext, useState } from 'react'

const CompendiumContext = createContext(null)

export function CompendiumProvider({ children }) {
  // Set of numeric IDs that have been deleted in this session
  const [deletedIds, setDeletedIds] = useState(new Set())
  // Map of id -> partial override object for updated entries
  const [updatedEntries, setUpdatedEntries] = useState({})
  // Array of fully custom created entries
  const [createdEntries, setCreatedEntries] = useState([])

  function deleteEntry(id) {
    setDeletedIds(prev => new Set([...prev, Number(id)]))
  }

  function updateEntry(id, data) {
    setUpdatedEntries(prev => ({
      ...prev,
      [Number(id)]: { ...prev[Number(id)], ...data },
    }))
  }

  function createEntry(entry) {
    setCreatedEntries(prev => [entry, ...prev])
  }

  return (
    <CompendiumContext.Provider value={{
      deletedIds,
      updatedEntries,
      createdEntries,
      deleteEntry,
      updateEntry,
      createEntry,
    }}>
      {children}
    </CompendiumContext.Provider>
  )
}

export function useCompendium() {
  const ctx = useContext(CompendiumContext)
  if (!ctx) throw new Error('useCompendium must be used within CompendiumProvider')
  return ctx
}
