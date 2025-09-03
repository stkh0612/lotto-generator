// Netlify Function: Proxy to Korea Lotto API (dhlottery)
// Usage: /.netlify/functions/lotto?round=1100
// Returns: JSON from upstream or 400/502 on error
const fetch = global.fetch || require('node-fetch')

exports.handler = async function(event) {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: corsHeaders(),
        body: ''
      }
    }

    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' }
    }

    const params = new URLSearchParams(event.queryStringParameters || {})
    const round = params.get('round')
    if (!round) {
      return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: 'round query param required' }) }
    }

    const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${encodeURIComponent(round)}`
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    const text = await res.text()

    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: text
    }
  } catch (err) {
    console.error(err)
    return { statusCode: 502, headers: corsHeaders(), body: JSON.stringify({ error: 'Bad Gateway' }) }
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

