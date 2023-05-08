import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Reset from './pages/forgot-password'
import Userpage from './pages/user-page'
import { useSelector } from 'react-redux'
import PasswordConfirm from './pages/reset-password-id'
import EmailPage from './pages/email-page'
import React from 'react'
import { state }from '../src/components/navbar'
import { LayoutProps } from "../src/components/layout"


const PrivateRoutes = () => {
  const { isAuth } = useSelector((state: state) => state.auth)
  // let role = localStorage.getItem('role')
  // if(props.role === 'admin'){
   return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>  
  // }else{
  //   return <Navigate to= '/put-files'/>
  // }

  // return {isAuth ? role==='admin' :<Outlet /> : <Navigate to='/login' />}
}
// isAuth ? role==='admin' :<Outlet /> : <Navigate to='/login' />

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state: state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Admincheck> <Dashboard /></Admincheck>} />
          <Route path = '/put-files' element = {<Usercheck><Userpage/></Usercheck>} />
          <Route path = '/put-files/:file/:id' element = {<EmailPage/>} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path = '/reset-password' element = {<Reset/>} />
          <Route path = '/reset-password/:id/:token' element = {<PasswordConfirm/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const Admincheck: any = ({children}: LayoutProps)=>{

  try {
    let role = localStorage.getItem('role')
   if(role === 'admin'){
    return <>{children}</>
  }else{
    return<Navigate to={'/put-files'}/>
  }
  } catch (error) {
    // console.log(error.message)
  }
  // <Navigate to={'/dashboard'}/>
  // <Navigate to={'/put-files'}/>
}

const Usercheck: any = ({children}: LayoutProps)=>{
  let role = localStorage.getItem('role')
  try {
    
   if(role === 'user'){
    return <>{children}</>
  }else{
    return<Navigate to={'/dashboard'}/>
  }
  } catch (error) {
    // console.log(error.message)
  }
  // <Navigate to={'/dashboard'}/>
  // <Navigate to={'/put-files'}/>
}

export default App
