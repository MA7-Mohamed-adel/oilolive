import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/app/store.js'
import { onAuthStateChanged } from 'firebase/auth'
import { onAuthFail, onAuthSuccess } from './Redux/futers/auth/authSlice.js'
import { auth } from './Firebase/firebase.js'
import { apiServices } from './Redux/services/Apisl/SpiltApi.js'




 onAuthStateChanged(auth,(user) => {

   if(user){
     
     store.dispatch(onAuthSuccess(user))
     store.dispatch(apiServices.endpoints.getAuthUser.initiate(user))
   }else{
    store.dispatch(onAuthFail())
   }
 })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
