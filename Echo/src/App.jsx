import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout.jsx'
import { ThemeProvider } from './context/ThemeContext';

import './App.css'

function App() {
 
  return (
  
    <Router>
      <ThemeProvider>
          <Layout/>
      </ThemeProvider>
    </Router>

   
  
  )
}

export default App
