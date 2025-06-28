import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Link, Share2, Download, Zap, Shield, Globe } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Mail,
      title: 'Email Extraction',
      description: 'Extract email addresses from any webpage with advanced pattern matching and duplicate removal.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      description: 'Find phone numbers in various formats including international, US, and local formats.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Link,
      title: 'All Links',
      description: 'Extract all internal and external links with domain categorization and link text.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Find Facebook, Twitter, Instagram, LinkedIn, YouTube, and TikTok links automatically.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Download,
      title: 'CSV Export',
      description: 'Download results in CSV format for easy analysis in Excel, Google Sheets, or databases.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Safe & Legal',
      description: 'Built-in rate limiting and respectful scraping practices to avoid overwhelming servers.',
      color: 'from-teal-500 to-green-500'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-6">
            Powerful Features for
            <span className="gradient-text"> Data Extraction</span>
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-400 max-w-3xl mx-auto">
            Everything you need to extract valuable data from websites quickly and efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features 