import '../styles/TagFilter.css'

function TagFilter({ allTags, selectedTags, onToggleTag, onClear }) {
  if (!allTags || allTags.length === 0) {
    return (
      <div className="sd-tags sd-tags--empty">
        <div className="sd-tags__label">Tags</div>
        <p className="sd-tags__empty-text">
          No tags yet. Add tags to your snippets to filter them here.
        </p>
      </div>
    )
  }

  return (
    <div className="sd-tags">
      <div className="sd-tags__label">Filter by tags</div>
      <div className="sd-tags__list">
        {allTags.map((tag) => {
          const isActive = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              className={`sd-tags__badge${isActive ? ' sd-tags__badge--active' : ''}`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
          )
        })}
      </div>
      {selectedTags.length > 0 && (
        <button
          type="button"
          className="sd-tags__clear"
          onClick={onClear}
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

export default TagFilter


