import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '100 scraping requests per month',
        'Basic data extraction',
        'CSV & JSON export',
        'Email support',
        'Community forum access'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and businesses',
      features: [
        'Unlimited scraping requests',
        'Advanced data extraction',
        'Priority processing',
        'API access',
        'Priority email support',
        'Custom export formats',
        'Bulk operations'
      ],
      popular: true,
      color: 'from-primary-500 to-accent-500'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment',
        'White-label solutions',
        'Training & onboarding'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-6">
            Simple
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-400 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`card ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-dark-500 dark:text-dark-400 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-dark-600 dark:text-dark-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-dark-700 dark:text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-dark-100 dark:bg-dark-800 text-dark-900 dark:text-white hover:bg-dark-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : 
                   plan.name === 'Pro' ? 'Start Pro Trial' : 'Contact Sales'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-dark-600 dark:text-dark-400 mb-4">
            All plans include our core features and 99.9% uptime guarantee.
          </p>
          <p className="text-sm text-dark-500 dark:text-dark-500">
            Need a custom plan? <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing 