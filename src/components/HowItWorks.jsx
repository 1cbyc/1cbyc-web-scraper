import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Download, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Globe,
      title: 'Enter Website URL',
      description: 'Simply paste the website URL you want to scrape data from.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Choose Data Type',
      description: 'Select what type of data you want to extract: emails, phones, links, or everything.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Download,
      title: 'Download Results',
      description: 'Get your data in CSV or JSON format, ready for analysis.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-6">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-400 max-w-3xl mx-auto">
            Three simple steps to extract valuable data from any website.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transform translate-x-4" />
                  )}
                </div>
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg">
                  <div className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                    {index + 1}. {step.title}
                  </div>
                  <p className="text-dark-600 dark:text-dark-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
            onClick={() => document.getElementById('scraper-tool').scrollIntoView({ behavior: 'smooth' })}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks 