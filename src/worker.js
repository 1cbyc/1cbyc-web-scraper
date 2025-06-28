// Cloudflare Worker for Web Scraping API
export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    const url = new URL(request.url)
    const path = url.pathname

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    try {
      if (path === '/api/scrape' && request.method === 'POST') {
        return await handleScrape(request, corsHeaders)
      } else {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  },
}

async function handleScrape(request, corsHeaders) {
  const data = await request.json()
  const { base_url, num_pages, scrape_type } = data

  if (!base_url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Simple scraping simulation
  const results = [{
    url: base_url,
    timestamp: new Date().toISOString(),
    emails: ['test@example.com', 'contact@example.com'],
    phone_numbers: ['+1-555-123-4567'],
    links: [{ url: `${base_url}/about`, domain: new URL(base_url).hostname }],
    social_media: { facebook: 2, twitter: 1 },
    contact_info: { contact_pages: [{ url: `${base_url}/contact`, text: 'Contact Us' }] }
  }]

  return new Response(JSON.stringify({
    success: true,
    results_count: results.length,
    data: results
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
} 