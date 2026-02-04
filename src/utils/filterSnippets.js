export function filterSnippets(snippets, searchQuery, selectedTags) {
  const query = (searchQuery || '').trim().toLowerCase()
  const tags = (selectedTags || []).map((t) => t.toLowerCase())

  return (snippets || []).filter((snippet) => {
    if (!snippet) return false

    // Tag AND logic: snippet must include every selected tag
    if (tags.length > 0) {
      const snippetTags = (snippet.tags || []).map((t) => String(t).toLowerCase())
      const hasAllTags = tags.every((tag) => snippetTags.includes(tag))
      if (!hasAllTags) return false
    }

    if (!query) return true

    const haystack = [
      snippet.title,
      snippet.code,
      (snippet.tags || []).join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })
}


