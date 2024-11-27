import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MenuProvider } from './context/MenuContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RoleProvider } from './context/RoleContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import { PermissionProvider } from './context/PermissionContext.jsx'
import Login from './components/Login.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './middleware/auth.js';
import { ValidatePermissionProvider } from './context/ValidatePermissionContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <ValidatePermissionProvider>
      <ThemeProvider>
        <PermissionProvider>
          <RoleProvider>
            <UserProvider>
              <MenuProvider>
                <ModalProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path='/' element={<Login />} />
                      <Route path='/home' element={<App />} />
                    </Routes>
                  </BrowserRouter>
                </ModalProvider>
              </MenuProvider>
            </UserProvider>
          </RoleProvider>
        </PermissionProvider>
      </ThemeProvider>
    </ValidatePermissionProvider>


  </QueryClientProvider>
  ,

)
