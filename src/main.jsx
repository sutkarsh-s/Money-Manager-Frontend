import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ThemeProvider>
)
