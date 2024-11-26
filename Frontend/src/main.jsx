import { StrictMode } from 'react'
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>

    <ThemeProvider>
      <PermissionProvider>
        <RoleProvider>
          <UserProvider>
            <MenuProvider>
              <ModalProvider>
                {/* <Login /> */}
                <App />
              </ModalProvider>
            </MenuProvider>
          </UserProvider>
        </RoleProvider>
      </PermissionProvider>
    </ThemeProvider>


  </QueryClientProvider>
  ,

)
