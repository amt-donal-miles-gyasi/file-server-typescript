import React, { useEffect, useState } from 'react';
import { fetchProtectedInfo, onLogout } from '../api/auth';
import Layout from '../components/layout'
// import Input from '../components/input';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';
const SERVERURL = process.env.SERVER_URL


 


const Dashboard2 = ()=>{

    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
 
    const [protectedData, setProtectedData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true)


    const protectedInfo = async () => {
        try {
          const { data } = await fetchProtectedInfo()
    
          setProtectedData(data.rows)
          console.log(data.rows)
    
          setTimeout(()=>{
            setLoading(false)
          },2000)
        } catch (error: any) {
          logout()
        console.log(error)
        }
      }

      const logout = async () => {
        try {
          await onLogout()
    
          dispatch(unauthenticateUser())
          localStorage.removeItem('isAuth')
          localStorage.removeItem('role')
        } catch (error: any) {
          console.log(error.response)
        }
      }

      
    


      useEffect(() => {
        protectedInfo()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);


        const handleClick= (id: number)=>{
            window.open(`${SERVERURL}/api/get-file/${id}`)//download file
            
        }

        const change = (e : React.ChangeEvent<HTMLInputElement>)=>{
          setSearch(e.target.value)
       
        }
       

      return loading ? (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      ) : (
        <div>
          <Layout>
    
            <h1>user Dashboard</h1>
            
            <div className="input-group mb-3 mt-20">
        
        <input  
            onChange = {e=>{change(e)}}
            className="form-control" 
            type="text"
            placeholder="Search for file by name"
            name= 'input'
        />
        
    </div>
                        <table className="table table-hover">
                          <thead key={0.5}>
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col">Originalname</th>
                              <th scope="col">Download</th>
                              <th scope="col">Send Email</th>
                            </tr>
                          </thead>
                          <tbody key={ 2.5}>
                            {protectedData.filter(numb=>(numb.originalname.toLowerCase().includes(search))).map(numb=>( 
                              
                            <tr key={numb.id}>
    
                              <th scope="row" key={numb.id}>{numb.id}</th>
                              <td>{numb.title}</td>
                              <td>{numb.description}</td>
                              <td>{numb.originalname}</td>
                              <td><button 
                              onClick={id=>{handleClick(numb.id)}}
                              className="btn btn-outline-secondary btn-primary" 
                              style={{color: "white"}} 
                              type="button">Download</button></td>
                              <td><NavLink to={`/put-files/${numb.originalname}/${numb.id}`} className="btn btn-outline-secondary btn-primary" style={{color: "white"}} type="button" >Send Email</NavLink></td>
                            </tr>
                            
                            ))}
                          </tbody>
                        </table>
                       
                        
                 
    
            <button onClick={() => logout()} className='btn btn-primary'>
              Logout
            </button>
          </Layout>
          <Outlet/>
        </div>
      )
    
}

export default Dashboard2
