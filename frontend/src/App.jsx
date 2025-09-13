// App.jsx
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Footer from "./components/Footer";
import Signup from "./components/profile/Signup";
import TermsOfServices from "./components/second/TermsOfServices";
import ContactUs from "./components/second/ContactUs";
import HelpCenter from "./components/second/HelpCenter";
import PrivacyPolicy from "./components/second/PrivacyPolicy";

import Hotels from "./components/first/Hotels";
import Cafes from "./components/first/Cafes";
import Attractions from "./components/first/Attractions";
import All from "./components/first/All";
import ScrollToTop from "./components/motion/ScrollToTop";   
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute"; 

function Layout() {
  return (
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />   
      <Outlet />
      <Footer />
    </>
  );
}

function LayoutNoFooter() {
  return (
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />  
      <Outlet />
    </>
  );
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
        {
          path: "/Hotels",
          element: (
            <ProtectedRoute>
              <Hotels />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cafes",
          element: (
            <ProtectedRoute>
              <Cafes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/attractions",
          element: (
            <ProtectedRoute>
              <Attractions />
            </ProtectedRoute>
          ),
        },
        {
          path: "/all",
          element: (
            <ProtectedRoute>
              <All />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      element: <LayoutNoFooter />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
