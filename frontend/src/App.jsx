import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookTable from './components/BookTable'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <Home navigate={navigate} />
      case 'menu':    return <Menu />
      case 'about':   return <About />
      case 'book':    return <BookTable />
      case 'contact': return <Contact />
      default:        return <Home navigate={navigate} />
    }
  }

  return (
    <>
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="main-content">{renderPage()}</main>
      <Footer navigate={navigate} />
    </>
  )
}

export default App
