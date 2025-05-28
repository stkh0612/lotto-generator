// ✅ CommonJS 형식: netlify/functions/proxy.js
// (Node 18+ 에선 전역 fetch가 있지만, 안전하게 require로도 처리)
const fetch = global.fetch || require('node-fetch')

exports.handler = async function(event, context) {
  // 1) Preflight (OPTIONS) 응답
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    }
  }

  // 2) POST만 허용
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  // Netlify가 event.body를 문자열로 넘겨줍니다
  const payload = event.body
  const webhook = "https://script.google.com/macros/s/AKfycbz8polqd-f5bRPmqBqlGIzMRoLJ7Eyqx3CBqIf1UPyURC4HgA4gDsEiKfUv67LGORguzA/exec"
  try {
    // 3) 실제 Google Apps Script Web App 호출
    const res = await fetch(webhook,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      }
    )
    const text = await res.text()

    // 4) CORS 헤더를 붙여서 클라이언트로 리턴
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
      body: text
    }
  } catch (err) {
    console.error(err)
    return { statusCode: 502, body: 'Bad Gateway' }
  }
}
