import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Route Imports
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className='App'>
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Register} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
