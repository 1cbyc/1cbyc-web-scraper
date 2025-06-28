import React from 'react'

export default function Footer() {
  return (
    <footer className="py-10 bg-dark-900 text-white text-center">
      <div className="flex flex-col items-center gap-1">
        <div className="text-sm mb-1">© 2025 • Made with <span style={{color: '#e25555'}}>&hearts;</span> by Isaac</div>
        {/* <div className="mt-1">
          <a href="https://x.com/1cbyc" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 block">x.com/1cbyc</a>
        </div> */}
        {/* <div className="mt-1">
          <a href="https://linkedin.com/in/isaacnsisong" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 block">linkedin.com/in/isaacnsisong</a>
        </div> */}
        <div className="mt-2 text-xs text-dark-300">
          Custom Web Scraper by Nsisong Labs -
          <a href="#" className="ml-2 hover:text-primary-400">Privacy Policy</a>
          <span className="mx-1">|</span>
          <a href="#" className="hover:text-primary-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
} 