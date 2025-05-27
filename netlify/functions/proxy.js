// netlify/functions/proxy.js
import fetch from 'node-fetch'

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const payload = event.body
  // 1) Apps Script Web App 호출
  const res = await fetch('https://script.google.com/macros/s/AKfycbz8polqd-f5bRPmqBqlGIzMRoLJ7Eyqx3CBqIf1UPyURC4HgA4gDsEiKfUv67LGORguzA/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  })
  const text = await res.text()
  // 2) CORS 헤더를 붙여서 리턴
  return {
    statusCode: res.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',           // ← 반드시 필요
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: text,
  }
}
