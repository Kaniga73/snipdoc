import SnippetGrid from './SnippetGrid'

function SnippetList({ snippets, onCopy, onEdit, onDelete, onTagClick }) {
  if (!snippets || snippets.length === 0) {
    return null
  }

  return (
    <SnippetGrid
      snippets={snippets}
      onCopy={onCopy}
      onEdit={onEdit}
      onDelete={onDelete}
      onTagClick={onTagClick}
    />
  )
}

export default SnippetList


