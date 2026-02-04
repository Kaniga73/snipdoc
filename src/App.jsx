import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import './App.css'
import Header from './components/Header'
import EmptyState from './components/EmptyState'
import Modal from './components/Modal'
import SnippetForm from './components/SnippetForm'
import SearchBar from './components/SearchBar'
import TagFilter from './components/TagFilter'
import SnippetList from './components/SnippetList'
import { mockSnippets } from './utils/mockSnippets'
import { loadSnippets, saveSnippets } from './utils/localStorage'
import { filterSnippets } from './utils/filterSnippets'

function App() {
  const [snippets, setSnippets] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [activeSnippet, setActiveSnippet] = useState(null)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = loadSnippets()
    if (stored && stored.length > 0) {
      setSnippets(stored)
    } else {
      setSnippets(mockSnippets)
    }
  }, [])

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('snipdoc.theme')
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme)
      document.documentElement.setAttribute('data-theme', storedTheme)
      return
    }
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = prefersDark ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  useEffect(() => {
    if (!snippets) return
    saveSnippets(snippets)
  }, [snippets])

  useEffect(() => {
    if (theme !== 'light' && theme !== 'dark') return
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('snipdoc.theme', theme)
  }, [theme])

  const allTags = useMemo(() => {
    const tags = new Set()
    snippets.forEach((snippet) => {
      ;(snippet.tags || []).forEach((tag) => {
        if (tag) tags.add(tag)
      })
    })
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [snippets])

  const filteredSnippets = useMemo(
    () => filterSnippets(snippets, searchQuery, selectedTags),
    [snippets, searchQuery, selectedTags],
  )

  const handleOpenAdd = () => {
    setFormMode('add')
    setActiveSnippet(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (snippet) => {
    setFormMode('edit')
    setActiveSnippet(snippet)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setActiveSnippet(null)
  }

  const handleSubmitForm = (data) => {
    if (formMode === 'edit' && activeSnippet) {
      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet.id === activeSnippet.id
            ? {
                ...snippet,
                ...data,
                documentation: {
                  ...(snippet.documentation || {}),
                  ...(data.documentation || {}),
                },
              }
            : snippet,
        ),
      )
    } else {
      const newSnippet = {
        id: `snippet-${Date.now()}`,
        ...data,
      }
      setSnippets((prev) => [newSnippet, ...prev])
    }
    handleCloseForm()
  }

  const handleDeleteSnippet = (snippet) => {
    Swal.fire({
      title: 'Delete snippet?',
      text: `“${snippet.title}” will be permanently removed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#e11d48',
      backdrop: true,
    }).then((result) => {
      if (!result.isConfirmed) return
      setSnippets((prev) => prev.filter((item) => item.id !== snippet.id))
      Swal.fire({
        title: 'Deleted',
        text: 'Your snippet has been removed.',
        icon: 'success',
        timer: 1600,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
      })
    })
  }

  const handleToggleTag = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    )
  }

  const handleClearTags = () => {
    setSelectedTags([])
  }

  const handleClickTagFromCard = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current : [...current, tag],
    )
  }

  const hasSnippets = snippets.length > 0
  const hasResults = filteredSnippets.length > 0

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.defaultPrevented) return
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'N') {
        event.preventDefault()
        if (!isFormOpen) {
          handleOpenAdd()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFormOpen])

  return (
    <>
      <Header
        onAddSnippet={handleOpenAdd}
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === 'light' ? 'dark' : 'light'))
        }
      />
      <div className="sd-app-shell">
        <main className="sd-main">
          <div className="sd-main__surface">
            {hasSnippets ? (
              <>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  totalCount={snippets.length}
                  filteredCount={filteredSnippets.length}
                />
                <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onToggleTag={handleToggleTag}
                  onClear={handleClearTags}
                />
                {hasResults ? (
                  <SnippetList
                    snippets={filteredSnippets}
                    onEdit={handleOpenEdit}
                    onDelete={handleDeleteSnippet}
                    onTagClick={handleClickTagFromCard}
                  />
                ) : (
                  <EmptyState
                    title="No snippets match your search"
                    body="Try adjusting your keywords or clearing filters to see more results."
                  />
                )}
              </>
            ) : (
              <div className="sd-app-empty-layout">
                <EmptyState />
              </div>
            )}
          </div>
        </main>
        {isFormOpen && (
          <Modal
            title={formMode === 'edit' ? 'Edit Snippet' : 'New Snippet'}
            onClose={handleCloseForm}
          >
            <SnippetForm
              mode={formMode}
              initialValues={activeSnippet}
              onCancel={handleCloseForm}
              onSubmit={handleSubmitForm}
            />
          </Modal>
        )}
      </div>
    </>
  )
}

export default App
