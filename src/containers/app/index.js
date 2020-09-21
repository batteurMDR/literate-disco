import React from 'react'
import { Route, Link } from 'react-router-dom'
import Dashboard from '../dashboard'

const App = () => (
  <div>
    <header>
      <Link to="/">Dashboard</Link>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
    </main>
  </div>
)

export default App
