const STORAGE_KEY = 'snipdoc.snippets'

export function saveSnippets(snippets) {
  try {
    const payload = JSON.stringify(snippets)
    window.localStorage.setItem(STORAGE_KEY, payload)
  } catch (error) {
    console.warn('[SnipDoc] Failed to save snippets to localStorage', error)
  }
}

export function loadSnippets() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
  } catch (error) {
    console.warn('[SnipDoc] Failed to load snippets from localStorage', error)
    return null
  }
}

export function clearSnippets() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('[SnipDoc] Failed to clear snippets from localStorage', error)
  }
}


