if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', onBeforeViteUpdate)
}

function onBeforeViteUpdate(event) {
  if (event.type === 'update') {
    const updates = []
    for (const update of event.updates) {
      updates.push(update)
      const acceptedPath = update.acceptedPath.replace(/\?v=[0-9a-f]+&/i, '?')
      if (acceptedPath !== update.acceptedPath) {
        updates.push({ ...update, acceptedPath })
      }
    }
    event.updates = updates
  }
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
