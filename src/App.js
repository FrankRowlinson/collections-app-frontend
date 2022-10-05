import NavBar from './components/NavBar'
import ItemDetail from './pages/ItemDetail/ItemDetail'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<ItemDetail />} />
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
