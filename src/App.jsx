import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ScraperTool from './components/ScraperTool'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Features />
            <ScraperTool />
            <HowItWorks />
            <Pricing />
            <Footer />
          </motion.div>
        } />
      </Routes>
    </div>
  )
}

export default App 