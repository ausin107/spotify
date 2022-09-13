export const getStorageValue = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    const result = window.localStorage.getItem(key)
    return result || defaultValue
  }
}
