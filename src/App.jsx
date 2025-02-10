import { useState } from 'react'
import SearchBar from './components/SearchBar'
import './styles/App.css'

function App() {

  return (
    <div className='mainAppDiv'>
      <header>
        <h1>Jamming</h1>
      </header>
      <main>
        <section className='searchSec'>
          <SearchBar></SearchBar>
        </section>
      </main>
    </div>
  )
}

export default App
