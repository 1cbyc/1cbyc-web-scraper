import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Sparkles, Globe, Download } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20 blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md rounded-full border border-dark-200 dark:border-dark-700 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary-600 mr-2" />
          <span className="text-sm font-medium text-dark-700 dark:text-dark-300">
            Advanced Web Scraping Platform
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-900 dark:text-white mb-6 leading-tight"
        >
          Extract Data from
          <br />
          <span className="gradient-text">Any Website</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-dark-600 dark:text-dark-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Powerful web scraping tool that extracts emails, contacts, social media links, and more. 
          Export to CSV or JSON with just a few clicks.
        </motion.p>

        {/* Only two buttons: Start Scraping Free and Star on GitHub */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#scraper-tool"
            className="btn-primary inline-block text-lg shadow-lg"
          >
            Start Scraping Free
          </a>
          <a
            href="https://github.com/1cbyc/1cbyc-web-scraper"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block text-lg shadow-lg"
          >
            Star on GitHub
          </a>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-dark-600 dark:text-dark-400">Websites Scraped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
            <div className="text-dark-600 dark:text-dark-400">Data Points Extracted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-dark-600 dark:text-dark-400">Success Rate</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-dark-400 dark:border-dark-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-dark-400 dark:bg-dark-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 