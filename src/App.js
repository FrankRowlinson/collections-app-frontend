import NavBar from './components/NavBar'
import ItemDetail from './pages/ItemDetail/ItemDetail'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import Home from './pages/Home/Home'
import AddCollection from './pages/AddCollection/AddCollection';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemDetail />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/create-collection" element={<AddCollection/>}/>
      </Routes>
    </>
  )
}

export default App
