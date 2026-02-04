import '../styles/Header.css'

function Header({ onAddSnippet, theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="sd-header">
      <div className="sd-header__title-group">
        <h1 className="sd-header__title">SnipDoc</h1>
        <p className="sd-header__tagline">Your Personal Code Encyclopedia</p>
      </div>
      <div className="sd-header__actions">
        <button
          className="sd-header__theme-toggle"
          type="button"
          onClick={onToggleTheme}
        >
          <span className="sd-header__theme-icon">
            {isDark ? '🌙' : '☀️'}
          </span>
          <span className="sd-header__theme-label">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
        <button
          className="sd-header__button"
          type="button"
          onClick={onAddSnippet}
        >
          + New Snippet
        </button>
      </div>
    </header>
  )
}

export default Header

