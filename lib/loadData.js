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
export async function loadSearchMusic(query) {
  const res = await fetch(
    `${BaseUrl}search?part=snippet&key=${API_KEY}&videoCategoryId=10&maxResults=12&type=video&q=${query}`
  )
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
