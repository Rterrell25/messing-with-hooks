import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"

const Home = () => {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState("react hooks")

  const getData = useCallback(async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    )
    setData(response.data)
  }, [query])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChange = event => {
    event.preventDefault()
    setQuery(event.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleChange} value={query} />
      <button type='button' onClick={getData}>
        Submit
      </button>
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
