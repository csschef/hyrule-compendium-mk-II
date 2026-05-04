import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import CreateEntryPage from './pages/CreateEntryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:game/entries" element={<ListPage />} />
      <Route path="/:game/entries/create" element={<CreateEntryPage />} />
      <Route path="/:game/entries/:id" element={<DetailPage />} />
    </Routes>
  )
}

export default App
