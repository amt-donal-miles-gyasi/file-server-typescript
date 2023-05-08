import React, {useState} from 'react';
import { resetPassword } from '../api/auth';
import { NavLink } from 'react-router-dom';



const Reset = () => {


    const [values, setValues] = useState({
        email: ''
      });
    const [error, setError] = useState<boolean>(false)
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            await resetPassword(values)
        } catch (error: any) {
            console.log(error.response.data)
            setError(error.response.data.error)
        }
    }
    return (
        <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
            <h1>RESET PASSWORD</h1>
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

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
        Send Email
        </button>
        <div>
            <NavLink to='/login'>
              <span>Login</span>
            </NavLink>
        </div>
        
      
    </form>

        
    )
  }
  
  export default Reset