import React, { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {
  const [submitting, setSubmitting] = useState(true)
  const [data, setData] = useState(null)
  const [query, setQuery] = useState("react hooks")

  useEffect(() => {
    // query can change, but don't actually trigger request unless submitting is true
    const getData = async () => {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      )
      setData(response.data)
      console.log(response.data)
      setSubmitting(false) // call is finished, set to false
    }

    // query can change, but don't actually trigger
    // request unless submitting is true

    if (submitting) {
      // is true initially, and again when button is clicked
      getData()
    }
  }, [submitting, query])

  const handleChange = event => {
    event.preventDefault()
    setQuery(event.target.value)
  }

  const getData = () => setSubmitting(true)

  const handleSearch = event => {
    event.preventDefault()
    getData()
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type='text' onChange={handleChange} value={query} />
        <button type='submit'>Submit</button>
      </form>
      {data &&
        data.hits.map(item => (
          <div key={item.objectID}>
            {item.url && (
              <>
                <a href={item.url}>{item.title}</a>
                <div>{item.author}</div>
              </>
            )}
          </div>
        ))}
    </div>
  )
}

export default Home
