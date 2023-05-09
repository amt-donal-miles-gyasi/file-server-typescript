import React, { useState } from 'react'
import { onLogin } from '../api/auth'
import Layout from '../components/layout'
import { useDispatch , useSelector} from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice';
import { NavLink } from 'react-router-dom';
import { state } from '../components/navbar'





const Login = () => {
   const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false);
  const { isAuth } = useSelector((state: state) => state.auth)
 

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault() 

    try {
     const {data} =  await onLogin(values)
      dispatch(authenticateUser())
      console.log(data)
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('role', data.role)
      let role = localStorage.getItem('role')
      console.log(role)
      if(isAuth&& role === 'admin'){
       console.log(data.role);
        //  navigate ('/dashboard' )
         
        
      }else{
        //  navigate('/put-files')
        console.log(2)
      }



    } catch (error: any) {
      console.log(error.response.datag)
      setError(error.response.data.errors[0].nestedErrors[0].msg)
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Login</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>

        <NavLink to='/reset-password' style={{  marginLeft: '20px ' }}>
            <span>Forgot Password</span>
        </NavLink>
      </form>

    </Layout>
  )
}

export default Login
