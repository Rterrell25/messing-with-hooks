import React, { useContext, useEffect, useCallback } from "react"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Route Imports
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Home from "./pages/Home"
import Github from "./pages/Github"
import Covid from "./pages/Covid"

// context
import { GithubContext } from "./contexts/GithubContext"

const App = () => {
  const { setData } = useContext(GithubContext)

  const fetchGit = useCallback(async () => {
    return axios
      .get(`https://api.github.com/users/rterrell25/repos?`)
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, [setData])

  useEffect(() => {
    fetchGit()
  }, [fetchGit])

  return (
    <div className='App'>
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Register} />
            <Route exact path='/github' component={Github} />
            <Route exact path='/covid' component={Covid} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
