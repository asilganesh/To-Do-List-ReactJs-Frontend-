
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import useAuthManager from './Composables/useAuthManager'
import PageNotFound from './Pages/PageNotFound'


function App() {

  const{getUserId}=useAuthManager()

return (
  <BrowserRouter>
  <Routes>
    {
      getUserId()
      ?
      <>
      
    <Route path='/' element = {<Home/>}/>
    <Route path='/*' element = {<PageNotFound/>}/>
      </>
      :
      <>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element = {<Register/>}/>
    <Route path='/' element = {<Home/>}/>
    <Route path='/*' element = {<PageNotFound/>}/>
      </>
    }
  </Routes>
  </BrowserRouter>
)
}

export default App
