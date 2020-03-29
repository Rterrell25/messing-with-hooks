import React, { useState, useEffect, useCallback, useRef } from "react"
import axios from "axios"

const INITIAL_STATE = {
  query: "react hooks"
}
const SECONDARY_STATE = {
  query: ""
}

const Home = () => {
  const [submitting, setSubmitting] = useState(true)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${formData.query}`
      )
      setData(response.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }, [formData.query])

  useEffect(() => {
    if (submitting) {
      // is true initially, and again when button is clicked
      getData().then(() => setSubmitting(false))
    }
  }, [submitting, getData])

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSearch = event => {
    event.preventDefault()
    getData()
  }

  const handleClear = () => {
    setFormData(SECONDARY_STATE)
    searchInputRef.current.focus()
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          onChange={handleChange}
          value={formData.query}
          name='query'
          ref={searchInputRef}
        />
        <button type='submit' onClick={() => setSubmitting(true)}>
          Submit
        </button>
        <button type='button' onClick={handleClear}>
          Clear
        </button>
      </form>
      {data && !loading ? (
        data.hits.map(item => (
          <div key={item.objectID}>
            {item.url && (
              <>
                <a href={item.url}>{item.title}</a>
                <div>{item.author}</div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {error && <p>{error.message}</p>}
    </div>
  )
}

export default Home
