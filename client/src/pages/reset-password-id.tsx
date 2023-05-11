import React , { useState , useEffect} from 'react';
// import { changePassword } from '../api/auth'; 
import { NavLink , useParams} from 'react-router-dom';
import axios from 'axios';
const SERVERURL = process.env.REACT_APP_SERVER_URL

const PasswordConfirm = ()=>{
    const [values, setValues] = useState({ 
        password: '',
        confirmPassword: '', 
    })
    const [loading, setLoading] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('')


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    
    const { id , token} = useParams();
    

    useEffect(()=>{
        async function fetchData() {
            
            const {data} = await axios.get(`${SERVERURL}/api/reset-password/${id}/${token}`)

            console.log(data.verified, data)
            setLoading(data.verified)
            setUser(data.username)
          }
        fetchData()
    }, [id, token]);

    const onSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()

        try {
            const  {data}  = await axios.post(`${SERVERURL}/api/reset-password/${id}/${token}`, {
                "password": values.password,
                "confirmPassword": values.confirmPassword
              })
            console.log(data)
            
        } catch (error: any) {
            // console.log(error.response.data.errors[0].msg);
            setError(error.response.data.errors[0].msg)
        }
    }
    


    return(
        <> 
        {!loading? <h1>page not found</h1>:
                
            <form className='container mt-3' onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <h1>Reset Password for {user}</h1>
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

                <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                    Confirm Password
                </label>
                <input
                    onChange={(e) => onChange(e)}
                    type='password'
                    value={values.confirmPassword}
                    className='form-control'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='confirmPassword'
                    required
                />
                </div>

                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
                <div>
                    <NavLink to='/login'>
                    <span>Login</span>
                    </NavLink>
                </div>
            </form>}
        </>
    )
}

export default PasswordConfirm

