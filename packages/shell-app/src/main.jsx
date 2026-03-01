import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mm/shared/styles'
import { AppContextProvider, ThemeProvider } from '@mm/shared'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ThemeProvider>
)
