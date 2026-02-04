import '../styles/EmptyState.css'

function EmptyState({
  title = 'No snippets yet',
  body = 'Start building your personal code encyclopedia by adding your first snippet.',
}) {
  return (
    <div className="sd-empty">
      <h2 className="sd-empty__title">{title}</h2>
      <p className="sd-empty__body">{body}</p>
    </div>
  )
}

export default EmptyState


