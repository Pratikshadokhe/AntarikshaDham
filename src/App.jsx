import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import HabitatPage from './components/HabitatPage'
import HabitatDesigner from './components/HabitatDesigner'
import Astronomy from './subpages/Astronomy'
import LifeInSpace from './subpages/LifeInSpace'
import SpaceTechnology from './subpages/SpaceTechnology'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/HabitatPage' element={<HabitatPage/>} />
        <Route path='/HabitatDesigner' element={<HabitatDesigner/>} />
        <Route path='/astronomy' element={<Astronomy/>} />
        <Route path='/lifeInSpace' element={<LifeInSpace/>} />
        <Route path='/spaceTechnology' element={<SpaceTechnology/>} />
      </Routes>
    </Router>
  )
}

export default App
