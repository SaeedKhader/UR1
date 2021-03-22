import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faSpinner,
  faTimes,
  faHandSparkles,
  faGlasses,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faSpinner, faTimes, faHandSparkles, faGlasses, faCheck)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
