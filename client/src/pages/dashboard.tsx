import React ,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'

import { unauthenticateUser } from '../redux/slices/authSlice'
import Userpage from '../components/upload-file'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  
  const [protectedData, setProtectedData] = useState<Array<any>>([])
  const navigate = useNavigate();


  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      localStorage.removeItem('role')
      navigate('/login')
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.rows)
      console.log(data.rows)
      setTimeout(()=>{
        setLoading(false)
      },2000)
      
    } catch (error) {
      logout()
    }
  }
  

  useEffect(() => {
    protectedInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>

        
        <h1>Dashboard</h1>
        
                    <table className="table table-hover">
                      <thead key={0.5}>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Originalname</th>
                          <th scope="col">Downloadcount</th>
                          <th scope="col">Emailcount</th>
                        </tr>
                      </thead>
                      <tbody key={ 2.5}>
                        {protectedData.map(numb=>( 
                          
                        <tr key={numb.id}>

                          <th scope="row" key={numb.id}>{numb.id}</th>
                          <td>{numb.title}</td>
                          <td>{numb.description}</td>
                          <td>{numb.originalname}</td>
                          <td>{numb.downloadcount}</td>
                          <td>{numb.emailcount}</td>
                        </tr>
                        
                        ))}
                      </tbody>
                    </table>
                    <div >
                      <Userpage/>
                    </div>
                    
             

        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
      </Layout>
    </div>
  )
}

export default Dashboard
