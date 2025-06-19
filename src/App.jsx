import './App.css'
import '../src/Animations/loaders.css'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from './Components/Authentication/Login'
import SignUP from './Components/Authentication/SignUP'
import Nav from './Components/Nav'
import Body from './Components/Body'
import Search from "./Components/Search"
import SearchedUserProfile from './Components/UserProfiles/SearchedUserProfile'
import EditProfile from './Components/UserProfiles/EditProfile'
import Verification from './Components/Authentication/Verification'
import VerificationShimmer from './Components/Authentication/VerificationShimmer'
import ErrorPage from './Errror'

const AuthLayout = () => {
  return (
    <Outlet></Outlet>
  )
}


function App() {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
    </>
  )
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUP></SignUP>
      },
      {
        path: "/verify-email/:token",
        element: <Verification />
      },
      {
        path: "/verify",
        element: <VerificationShimmer></VerificationShimmer>
      }
    ]
  },
  {
    element: <App></App>,
    children: [
      {
        path: "/home",
        element: <Body></Body>
      },
      {
        path: "/profile/:id",
        element: <SearchedUserProfile></SearchedUserProfile>,
      },
      {
        path: "/profile/edit/:id",
        element: <EditProfile></EditProfile>,
      },
      {
        path: "/search",
        element: <Search></Search>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/> 
  }
])



export default appRouter




