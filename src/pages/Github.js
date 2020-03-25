import React, { useEffect, useState } from "react"
import axios from "axios"

const Github = () => {
  const [data, setData] = useState(null)
  const [updated, setUpdated] = useState(false)

  const fetchGit = () => {
    axios
      .get(`https://api.github.com/users/rterrell25/repos?`)
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const handleUpdated = () => {
    setUpdated(!updated)
    data &&
      data.sort((a, b) => {
        if (updated) return a.updated_at > b.updated_at ? -1 : 1
        return a.updated_at > b.updated_at ? 1 : -1
      })
  }

  useEffect(() => {
    fetchGit()
  }, [])

  return (
    <div>
      <button className='github-filter' onClick={handleUpdated}>
        Updated {updated ? "(oldest)" : "(newest)"}
      </button>
      {!data ? (
        <h1>Loading...</h1>
      ) : (
        data.map(user => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.language}</div>
            <div>{user.updated_at}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default Github
