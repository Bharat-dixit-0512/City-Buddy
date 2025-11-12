import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Footer from "./components/Footer";
import Signup from "./components/profile/Signup";
import TermsOfServices from "./components/second/TermsOfServices";
import ContactUs from "./components/second/ContactUs";
import HelpCenter from "./components/second/HelpCenter";
import PrivacyPolicy from "./components/second/PrivacyPolicy";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import MapView from "./pages/MapView";
import Profile from "./pages/Profile"; // Import the new profile page
import ScrollToTop from "./components/motion/ScrollToTop";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import { userAuth } from "./context/AuthProvider";

const RootRedirect = () => {
  const { authUser } = userAuth();
  return authUser ? <Home /> : <Home />;
};

function Layout() {
  return (
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <RootRedirect /> },
        { path: "/termsOfServices", element: <TermsOfServices /> },
        { path: "/contactUs", element: <ContactUs /> },
        { path: "/helpCenter", element: <HelpCenter /> },
        { path: "/privacyPolicy", element: <PrivacyPolicy /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/restaurants",
          element: <ProtectedRoute><CategoryPage category="Restaurant" title="Restaurants" description="Discover top-rated restaurants." /></ProtectedRoute>,
        },
        {
          path: "/cafes",
          element: <ProtectedRoute><CategoryPage category="Cafe" title="Cafes" description="Explore the best cafes for a perfect break." /></ProtectedRoute>,
        },
        {
          path: "/attractions",
          element: <ProtectedRoute><CategoryPage category="Attraction" title="Attractions" description="Discover top attractions across India." /></ProtectedRoute>,
        },
        {
          path: "/hotels",
          element: <ProtectedRoute><CategoryPage category="Hotel" title="Hotels" description="Find the perfect hotel for your stay." /></ProtectedRoute>,
        },
        {
          path: "/guesthouses",
          element: <ProtectedRoute><CategoryPage category="Guesthouse" title="Guesthouses" description="Find cozy and affordable guesthouses." /></ProtectedRoute>,
        },
        {
          path: "/search",
          element: <ProtectedRoute><SearchResults /></ProtectedRoute>,
        },
        {
          path: "/favorites",
          element: <ProtectedRoute><Favorites /></ProtectedRoute>,
        },
        {
          path: "/map",
          element: <ProtectedRoute><MapView /></ProtectedRoute>,
        },
        {
          path: "/profile", // <-- HERE IS THE NEW PROFILE ROUTE
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin",
          element: <ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>,
        },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;