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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    {/* <RoleProvider> */}
    <PermissionProvider>
      <RoleProvider>
        <UserProvider>
          <MenuProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </MenuProvider>
        </UserProvider>
      </RoleProvider>
    </PermissionProvider>

    {/* </RoleProvider> */}
  </QueryClientProvider>
  ,

)
