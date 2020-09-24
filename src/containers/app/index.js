import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../dashboard'
import Country from '../country'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/country/:counrtyCode" component={Country} />
    </main>
  </div>
)

export default App
