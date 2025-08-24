import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/profile/Login"
import Footer from "./components/Footer" // (don’t forget this)
import Signup from "./components/profile/Signup"
import TermsOfServices from "./components/second/TermsOfServices"
import ContactUs from "./components/second/ContactUs"
import HelpCenter from "./components/second/HelpCenter"
import PrivacyPolicy from "./components/second/PrivacyPolicy"

import Hotels from "./components/first/Hotels"
import Cafes from "./components/first/Cafes"
import Attractions from "./components/first/Attractions"
import All from "./components/first/All"



function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function LayoutNoFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/TermsOfServices", element: <TermsOfServices /> },
        { path: "/ContactUs", element: <ContactUs /> },
        { path: "/HelpCenter", element: <HelpCenter /> },
        { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },
        { path: "/Hotels", element: <Hotels /> },
        { path: "/cafes", element: <Cafes /> },
        { path: "/attractions", element: <Attractions /> },
        { path: "/all", element: <All /> },
        
      ],
    },
    {
      element: <LayoutNoFooter />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/Signup", element: <Signup /> },

      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
