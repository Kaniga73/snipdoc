import SnippetCard from './SnippetCard'
import '../styles/SnippetGrid.css'

function SnippetGrid({ snippets, onCopy, onEdit, onDelete, onTagClick }) {
  if (!snippets || snippets.length === 0) {
    return null
  }

  return (
    <section className="sd-snippet-grid">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onCopy={onCopy}
          onEdit={onEdit}
          onDelete={onDelete}
          onTagClick={onTagClick}
        />
      ))}
    </section>
  )
}

export default SnippetGrid

