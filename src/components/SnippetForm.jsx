import { useState, useEffect } from 'react'
import '../styles/SnippetForm.css'

const emptyDocumentation = {
  purpose: '',
  parameters: '',
  returnValue: '',
  examples: '',
  gotchas: '',
  whenToUse: '',
  alternatives: '',
}

const defaultValues = {
  title: '',
  code: '',
  tags: '',
  documentation: emptyDocumentation,
}

function SnippetForm({ mode = 'add', initialValues, onCancel, onSubmit }) {
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title || '',
        code: initialValues.code || '',
        tags: (initialValues.tags || []).join(', '),
        documentation: {
          ...emptyDocumentation,
          ...(initialValues.documentation || {}),
        },
      })
    } else {
      setValues(defaultValues)
    }
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name.startsWith('documentation.')) {
      const field = name.split('.')[1]
      setValues((prev) => ({
        ...prev,
        documentation: {
          ...prev.documentation,
          [field]: value,
        },
      }))
      return
    }

    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsBlur = () => {
    const normalized = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .join(', ')
    setValues((prev) => ({ ...prev, tags: normalized }))
  }

  const validate = () => {
    const nextErrors = {}
    const title = values.title.trim()
    const code = values.code.trim()

    if (!title || title.length < 1 || title.length > 100) {
      nextErrors.title = 'Title must be between 1 and 100 characters.'
    }

    if (!code || code.length < 10) {
      nextErrors.code = 'Code must be at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const tags = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    onSubmit({
      title: values.title.trim(),
      code: values.code.trim(),
      tags,
      documentation: values.documentation,
    })
  }

  const isEditMode = mode === 'edit'

  return (
    <form className="sd-form" onSubmit={handleSubmit} noValidate>
      <div className="sd-form__row">
        <label className="sd-form__label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="sd-form__input"
          maxLength={100}
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. Debounced search input"
        />
        {errors.title && <p className="sd-form__error">{errors.title}</p>}
      </div>

      <div className="sd-form__row">
        <label className="sd-form__label" htmlFor="code">
          Code
        </label>
        <textarea
          id="code"
          name="code"
          className="sd-form__textarea sd-form__textarea--code"
          rows={16}
          value={values.code}
          onChange={handleChange}
          placeholder="Paste or write your code snippet here..."
        />
        {errors.code && <p className="sd-form__error">{errors.code}</p>}
      </div>

      <div className="sd-form__row">
        <label className="sd-form__label" htmlFor="tags">
          Tags
          <span className="sd-form__label-hint">comma-separated</span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="sd-form__input"
          value={values.tags}
          onChange={handleChange}
          onBlur={handleTagsBlur}
          placeholder="react, hooks, performance"
        />
      </div>

      <fieldset className="sd-form__fieldset">
        <legend className="sd-form__legend">Documentation (optional)</legend>

        <div className="sd-form__grid">
          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.purpose">
              Purpose
            </label>
            <textarea
              id="documentation.purpose"
              name="documentation.purpose"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.purpose}
              onChange={handleChange}
              placeholder="What problem does this snippet solve?"
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.parameters">
              Parameters
            </label>
            <textarea
              id="documentation.parameters"
              name="documentation.parameters"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.parameters}
              onChange={handleChange}
              placeholder="List parameters and expected types."
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.returnValue">
              Return Value
            </label>
            <textarea
              id="documentation.returnValue"
              name="documentation.returnValue"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.returnValue}
              onChange={handleChange}
              placeholder="Describe what this snippet returns or produces."
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.examples">
              Examples
            </label>
            <textarea
              id="documentation.examples"
              name="documentation.examples"
              className="sd-form__textarea"
              rows={3}
              value={values.documentation.examples}
              onChange={handleChange}
              placeholder="Provide example usages or variations."
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.gotchas">
              Gotchas
            </label>
            <textarea
              id="documentation.gotchas"
              name="documentation.gotchas"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.gotchas}
              onChange={handleChange}
              placeholder="Edge cases, limitations, or pitfalls."
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.whenToUse">
              When to Use
            </label>
            <textarea
              id="documentation.whenToUse"
              name="documentation.whenToUse"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.whenToUse}
              onChange={handleChange}
              placeholder="Scenarios where this snippet shines."
            />
          </div>

          <div className="sd-form__row">
            <label className="sd-form__label" htmlFor="documentation.alternatives">
              Alternatives
            </label>
            <textarea
              id="documentation.alternatives"
              name="documentation.alternatives"
              className="sd-form__textarea"
              rows={2}
              value={values.documentation.alternatives}
              onChange={handleChange}
              placeholder="Alternative approaches or related snippets."
            />
          </div>
        </div>
      </fieldset>

      <div className="sd-form__footer">
        <button
          type="button"
          className="sd-form__button sd-form__button--ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="sd-form__button sd-form__button--primary">
          {isEditMode ? 'Update Snippet' : 'Save Snippet'}
        </button>
      </div>
    </form>
  )
}

export default SnippetForm


