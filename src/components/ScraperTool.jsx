import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Download, Globe, Mail, Phone, Link, Share2, Users, FileText, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ScraperTool = () => {
  const [formData, setFormData] = useState({
    base_url: '',
    num_pages: 1,
    scrape_type: 'all',
    output_format: 'json'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)

  const scrapingOptions = [
    {
      id: 'all',
      title: 'Everything',
      description: 'Emails, phones, links, social media',
      icon: Zap,
      color: 'from-primary-500 to-accent-500'
    },
    {
      id: 'emails',
      title: 'Email Addresses',
      description: 'Extract all email addresses',
      icon: Mail,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'phones',
      title: 'Phone Numbers',
      description: 'Extract phone numbers',
      icon: Phone,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'links',
      title: 'All Links',
      description: 'Extract all links',
      icon: Link,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'social',
      title: 'Social Media',
      description: 'Social media links',
      icon: Share2,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'contacts',
      title: 'Contact Info',
      description: 'Contact forms and pages',
      icon: Users,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.base_url) {
      toast.error('Please enter a website URL')
      return
    }

    setIsLoading(true)
    setResults(null)

    try {
      // For now, we'll use a mock API endpoint
      // In production, this would be your Cloudflare Worker URL
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setResults(data)
        toast.success(`Successfully scraped ${data.results_count} pages!`)
      } else {
        toast.error(data.error || 'Scraping failed')
      }
    } catch (error) {
      console.error('Scraping error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadResults = () => {
    if (!results) return

    const dataStr = formData.output_format === 'csv' 
      ? convertToCSV(results.data)
      : JSON.stringify(results.data, null, 2)

    const dataBlob = new Blob([dataStr], {
      type: formData.output_format === 'csv' ? 'text/csv' : 'application/json'
    })

    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `scraped_data.${formData.output_format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('Download started!')
  }

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return ''

    const headers = ['url', 'timestamp', 'data_type', 'data_content']
    const rows = []

    data.forEach(item => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'url' && key !== 'timestamp') {
          let content = ''
          if (Array.isArray(value)) {
            content = value.join('; ')
          } else if (typeof value === 'object') {
            content = JSON.stringify(value)
          } else {
            content = String(value)
          }
          
          rows.push([item.url, item.timestamp, key, content])
        }
      })
    })

    const csvContent = [headers.join(','), ...rows.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )].join('\n')

    return csvContent
  }

  return (
    <section id="scraper-tool" className="py-20 bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-6">
            Start Scraping
            <span className="gradient-text"> Right Now</span>
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-400 max-w-3xl mx-auto">
            Enter a website URL and choose what data you want to extract. Our advanced scraper will do the rest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.base_url}
                  onChange={(e) => setFormData({ ...formData, base_url: e.target.value })}
                  placeholder="https://example.com"
                  className="input-field"
                  required
                />
              </div>

              {/* Number of Pages */}
              <div>
                <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
                  Number of Pages
                </label>
                <input
                  type="number"
                  value={formData.num_pages}
                  onChange={(e) => setFormData({ ...formData, num_pages: parseInt(e.target.value) })}
                  min="1"
                  max="50"
                  className="input-field"
                />
              </div>

              {/* Scraping Options */}
              <div>
                <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-4">
                  What to Scrape
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scrapingOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, scrape_type: option.id })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.scrape_type === option.id
                            ? `border-primary-500 bg-gradient-to-r ${option.color} bg-opacity-10`
                            : 'border-dark-200 dark:border-dark-700 hover:border-primary-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${
                          formData.scrape_type === option.id ? 'text-primary-600' : 'text-dark-500'
                        }`} />
                        <div className="font-semibold text-dark-900 dark:text-white text-sm">
                          {option.title}
                        </div>
                        <div className="text-xs text-dark-500 dark:text-dark-400">
                          {option.description}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
                  Output Format
                </label>
                <select
                  value={formData.output_format}
                  onChange={(e) => setFormData({ ...formData, output_format: e.target.value })}
                  className="input-field"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start Scraping
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
              <FileText className="w-6 h-6 inline mr-2" />
              Results
            </h3>

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
                <p className="text-dark-600 dark:text-dark-400">
                  Scraping in progress<span className="loading-dots"></span>
                </p>
              </div>
            )}

            {results && !isLoading && (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">
                        Scraping Complete!
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-300">
                        {results.results_count} pages scraped successfully
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadResults}
                      className="btn-primary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </motion.button>
                  </div>
                </div>

                <div className="bg-dark-50 dark:bg-dark-800 rounded-lg p-4">
                  <pre className="text-sm text-dark-700 dark:text-dark-300 overflow-auto max-h-64">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {!results && !isLoading && (
              <div className="text-center py-12 text-dark-500 dark:text-dark-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your scraped data will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ScraperTool 