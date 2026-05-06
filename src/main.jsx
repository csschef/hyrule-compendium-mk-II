import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CompendiumProvider } from './context/CompendiumContext'
import './index.css'
import './components/ActionButtons.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/hyrule-compendium-mk-II/">
      <CompendiumProvider>
        <App />
      </CompendiumProvider>
    </BrowserRouter>
  </StrictMode>,
)
