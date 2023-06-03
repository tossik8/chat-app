import Login from './components/Login'
import Register from './components/Register'
import MainWindow from './routes/MainWindow'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserForm from './routes/UserForm'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserForm/>}>
            <Route index element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
          </Route>
          <Route path="/main" element={<MainWindow/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
