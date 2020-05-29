import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const INITIAL_STATE = {
  query: 'react hooks'
}
const CLEAR_STATE = {
  query: ''
}

const getData = url => {
  return axios.get(url)
}

const Home = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=react hooks'
  )
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  useEffect(() => {
    setLoading(true)
    getData(url, setLoading)
      .then(res => {
        setLoading(false)
        setData(res.data)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [url])

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSearch = event => {
    event.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${formData.query}`)
  }

  const handleClear = () => {
    setFormData(CLEAR_STATE)
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
        <button type='submit'>Submit</button>
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
