import React from 'react'
export const API_KEY = 'AIzaSyDi6TKct2Y5l5v00vIbK98jeVnO30eAnZA'
export const BaseUrl = 'https://www.googleapis.com/youtube/v3/'
export async function loadTrendingMusic({ countryId }) {
  const res = await fetch(`${BaseUrl}videos?part=snippet&key=${API_KEY}&chart=mostPopular&maxResults=12&regionCode=${countryId}&videoCategoryId=10`)
  const data = await res.json()
  return data
}
