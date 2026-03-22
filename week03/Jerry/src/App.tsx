import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Zustand from './pages/Zustand'
import Redux from './pages/Redux'
import ContextApi from './pages/ContextApi'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/zustand">Zustand</Link> |{' '}
        <Link to="/redux">Redux</Link> |{' '}
        <Link to="/context-api">Context API</Link>
      </nav>
      <Routes>
        <Route path="/zustand" element={<Zustand />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="/context-api" element={<ContextApi />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
