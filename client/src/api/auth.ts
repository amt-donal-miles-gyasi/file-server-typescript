import axios from 'axios';

axios.defaults.withCredentials = true

export async function onRegistration(registrationData: any) {
  return await axios.post(
    'http://localhost:5000/api/register',
    registrationData
  )
}

export async function onLogin(loginData : any) {
  return await axios.post('http://localhost:5000/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:5000/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:5000/api/protected')
}

export async function resetPassword(email: any) {
  return await axios.post('http://localhost:5000/api/reset-password', email)
}

// export async function changePassword(id, token, password, changePassword){
//   return await axios.post(`http://localhost:5000/api/reset-password/${id}/${token}`, {
//     "password": password,
//     "changePassword": changePassword
//   })
//}
