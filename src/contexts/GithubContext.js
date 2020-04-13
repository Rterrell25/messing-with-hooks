import React, { useState, createContext, useContext } from "react"

export const GithubContext = createContext()

export const GithubProvider = (props) => {
  const [data, setData] = useState(null)

  return (
    <GithubContext.Provider value={{ data, setData }}>
      {props.children}
    </GithubContext.Provider>
  )
}

export const useGithub = () => useContext(GithubContext)
