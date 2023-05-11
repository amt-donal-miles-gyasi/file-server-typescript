import axios from 'axios';
const SERVERURL = process.env.REACT_APP_SERVER_URL

axios.defaults.withCredentials = true

export async function onRegistration(registrationData: any) {
  return await axios.post(
   `${SERVERURL}/api/register`,
    registrationData
  )
}

export async function onLogin(loginData : any) {
  return await axios.post(`${SERVERURL}/api/login`, loginData)
}

export async function onLogout() {
  return await axios.get(`${SERVERURL}/api/logout`)
}

export async function fetchProtectedInfo() {
  return await axios.get(`${SERVERURL}/api/protected`)
}

export async function resetPassword(email: any) {
  return await axios.post(`${SERVERURL}/api/reset-password`, email)
}

// export async function changePassword(id, token, password, changePassword){
//   return await axios.post(`http://localhost:5000/api/reset-password/${id}/${token}`, {
//     "password": password,
//     "changePassword": changePassword
//   })
//}
