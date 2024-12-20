import IntroCard from "./components/IntroCard"
import Menu from "./components/Menu"
import Role from "./components/Role"
import SideBar from "./components/SideBar"
import Users from "./components/Users"
import { useMenu } from "./context/MenuContext"
import Permission from "./components/Permission"
import { useTheme } from "./context/ThemeContext"

function App() {
  const { menu } = useMenu(); ``
  const { theme } = useTheme();




  return (
    <div className={`w-full h-screen overflow-auto ${theme == 'light' ? 'bg-light' : 'bg-black'} flex justify-center gap-5 relative items-start`}>
      <SideBar />
      {/* <MenuProvider> */}

      <div className="w-10/12 mx-auto">
        <h1 className={`py-3 font-bold text-lg pl-1 ${theme == 'dark' && 'text-white'}`}>Dashboard</h1>
        <IntroCard />
        <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-900'} w-full mt-10`}>
          <Menu />

          {/* <MenuProvider> */}
          {menu == 'users' && <Users />}
          {menu == 'roles' && <Role />}
          {menu == 'permissions' && <Permission />}
          {/* </MenuProvider> */}
        </div>
      </div>
      {/* <Modal /> */}
      {/* </MenuProvider> */}
    </div>
  )
}

export default App
