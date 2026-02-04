import { useEffect, useMemo, useRef, useState } from 'react'
import Prism from 'prismjs'
import '../styles/SnippetCard.css'

function SnippetCard({ snippet, onCopy, onEdit, onDelete, onTagClick }) {
  const [docsOpen, setDocsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  const languageClass = useMemo(() => {
    const lang = (snippet.language || '').toLowerCase()
    if (lang.includes('typescript') || lang === 'ts') return 'language-typescript'
    if (lang.includes('python') || lang === 'py') return 'language-python'
    if (lang.includes('html') || lang.includes('markup')) return 'language-markup'
    if (lang.includes('css')) return 'language-css'
    return 'language-javascript'
  }, [snippet.language])

  const codePreview = useMemo(() => {
    const lines = (snippet.code || '').split('\n')
    const previewLines = lines.slice(0, 5)
    return previewLines.join('\n')
  }, [snippet.code])

  const hasMoreCode =
    typeof snippet.code === 'string' && snippet.code.split('\n').length > 5

  const hasAnyDocs =
    snippet.documentation &&
    Object.values(snippet.documentation).some((value) => value && value.trim())

  const handleCopy = async () => {
    if (onCopy) {
      onCopy(snippet)
    }
    try {
      await navigator.clipboard.writeText(snippet.code || '')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.warn('[SnipDoc] Failed to copy snippet to clipboard', error)
    }
  }

  const handleEdit = () => {
    if (!onEdit) return
    onEdit(snippet)
  }

  const handleDelete = () => {
    if (!onDelete) return
    onDelete(snippet)
  }

  useEffect(() => {
    if (!codeRef.current) return
    Prism.highlightElement(codeRef.current)
  }, [codePreview, languageClass])

  return (
    <article className="sd-snippet-card">
      <header className="sd-snippet-card__header">
        <h3 className="sd-snippet-card__title">{snippet.title}</h3>
        {snippet.language && (
          <span className="sd-snippet-card__language">{snippet.language}</span>
        )}
      </header>

      {snippet.description && (
        <p className="sd-snippet-card__description">{snippet.description}</p>
      )}

      <pre className="sd-snippet-card__code">
        <code ref={codeRef} className={languageClass}>
          {codePreview}
        </code>
      </pre>
      {hasMoreCode && (
        <div className="sd-snippet-card__code-more">⋯ truncated preview</div>
      )}

      <div className="sd-snippet-card__toolbar">
        <button
          type="button"
          className="sd-snippet-card__btn"
          onClick={handleCopy}
        >
          {copied ? 'Copied! ✓' : 'Copy'}
        </button>
        <button
          type="button"
          className="sd-snippet-card__btn"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="sd-snippet-card__btn sd-snippet-card__btn--danger"
          onClick={handleDelete}
        >
          Delete
        </button>
        {hasAnyDocs && (
          <button
            type="button"
            className="sd-snippet-card__btn sd-snippet-card__btn--ghost"
            onClick={() => setDocsOpen((open) => !open)}
          >
            {docsOpen ? '📝 Hide Documentation' : '📝 View Documentation'}
          </button>
        )}
      </div>

      {snippet.tags && snippet.tags.length > 0 && (
        <div className="sd-snippet-card__tags">
          {snippet.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="sd-snippet-card__tag"
              onClick={() => onTagClick && onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {docsOpen && hasAnyDocs && (
        <section className="sd-snippet-card__docs">
          {snippet.documentation.purpose && (
            <div className="sd-snippet-card__docs-block">
              <h4>Purpose</h4>
              <p>{snippet.documentation.purpose}</p>
            </div>
          )}
          {snippet.documentation.parameters && (
            <div className="sd-snippet-card__docs-block">
              <h4>Parameters</h4>
              <p>{snippet.documentation.parameters}</p>
            </div>
          )}
          {snippet.documentation.returnValue && (
            <div className="sd-snippet-card__docs-block">
              <h4>Return Value</h4>
              <p>{snippet.documentation.returnValue}</p>
            </div>
          )}
          {snippet.documentation.examples && (
            <div className="sd-snippet-card__docs-block">
              <h4>Examples</h4>
              <p>{snippet.documentation.examples}</p>
            </div>
          )}
          {snippet.documentation.gotchas && (
            <div className="sd-snippet-card__docs-block">
              <h4>Gotchas</h4>
              <p>{snippet.documentation.gotchas}</p>
            </div>
          )}
          {snippet.documentation.whenToUse && (
            <div className="sd-snippet-card__docs-block">
              <h4>When to Use</h4>
              <p>{snippet.documentation.whenToUse}</p>
            </div>
          )}
          {snippet.documentation.alternatives && (
            <div className="sd-snippet-card__docs-block">
              <h4>Alternatives</h4>
              <p>{snippet.documentation.alternatives}</p>
            </div>
          )}
        </section>
      )}
    </article>
  )
}

export default SnippetCard

