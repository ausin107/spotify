export const API_KEY = 'AIzaSyDi6TKct2Y5l5v00vIbK98jeVnO30eAnZA'
// export const API_KEY = 'AIzaSyCcqFgpe6_xZ_xt0nkwz5B_k3fNAliBwRg'
export const BaseUrl = 'https://www.googleapis.com/youtube/v3/'
export async function loadTrendingMusic(countryId) {
  const res = await fetch(
    `${BaseUrl}videos?part=snippet&key=${API_KEY}&chart=mostPopular&maxResults=12&regionCode=${countryId}&videoCategoryId=10`
  )
  const data = await res.json()
  return data
}
export async function loadSearchMusic(query, maxResults, optionParam) {
  const res = await fetch(
    `${BaseUrl}search?part=snippet&key=${API_KEY}&videoCategoryId=10&maxResults=${maxResults}&order=viewCount&type=video&q=${query}&videoEmbeddable=true${optionParam}`
  )
  const data = await res.json()
  return data
}
export async function loadSearchPlaylists(query, maxResults) {
  const res = await fetch(
    `${BaseUrl}search?part=snippet&key=${API_KEY}&maxResults=${maxResults}&order=viewCount&type=playlist&q=${query}+music`
  )
  const data = await res.json()
  return data
}
export async function loadPlaylistItems(playlistId, maxResults) {
  const res = await fetch(
    `${BaseUrl}playlistItems?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=${maxResults}`
  )
  const data = await res.json()
  return data
}
export async function loadPlaylistInfo(playlistId) {
  const res = await fetch(`${BaseUrl}playlists?part=snippet&key=${API_KEY}&id=${playlistId}`)
  const data = await res.json()
  return data
}
export async function loadMusicData(id) {
  const res = await fetch(`${BaseUrl}videos?part=contentDetails&key=${API_KEY}&id=${id}`)
  const data = await res.json()
  return data
}
export async function loadMusicArtist(id) {
  const res = await fetch(`${BaseUrl}channels?part=snippet&key=${API_KEY}&id=${id}`)
  const data = await res.json()
  return data
}
export async function loadAllMusicArtics(artistData) {
  let data = await Promise.all(
    await artistData.map(async (item) => {
      const res = await loadMusicArtist(item)
      return res.items[0]
    })
  )
  let jsonObj = data.map(JSON.stringify)
  let uniqueSet = new Set(jsonObj)
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse)
  return uniqueArray
}
