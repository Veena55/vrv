import IntroCard from "./components/IntroCard"
import Menu from "./components/Menu"
import Modal from "./components/Modal"
import Role from "./components/Role"
import SideBar from "./components/SideBar"
import Users from "./components/Users"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <div className='w-full h-screen overflow-auto bg-light flex justify-center gap-5 relative items-start'>
      <SideBar />
      <QueryClientProvider client={queryClient}>
        <div className="w-10/12 mx-auto">
          <h1 className="py-3 font-bold text-lg pl-1">Admin Dashboard</h1>
          <IntroCard />
          <div className="bg-white w-full mt-10">
            <Menu />
            <Users />
            {/* <Role /> */}
          </div>
        </div>
        {/* <Modal /> */}
      </QueryClientProvider>
    </div>
  )
}

export default App
