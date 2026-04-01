import { Suspense, lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/motion/ScrollToTop";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/shared/Spinner";
import { useTheme } from "./context/useTheme";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/profile/Login"));
const Signup = lazy(() => import("./components/profile/Signup"));
const TermsOfServices = lazy(() =>
  import("./components/second/TermsOfServices")
);
const ContactUs = lazy(() => import("./components/second/ContactUs"));
const HelpCenter = lazy(() => import("./components/second/HelpCenter"));
const PrivacyPolicy = lazy(() => import("./components/second/PrivacyPolicy"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Favorites = lazy(() => import("./pages/Favorites"));
const MapView = lazy(() => import("./pages/MapView"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <Spinner />
  </div>
);

const renderPage = (Component, props) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

function Layout() {
  const { isDark } = useTheme();

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#e2e8f0" : "#0f172a",
            border: `1px solid ${isDark ? "rgba(148,163,184,0.2)" : "rgba(15,23,42,0.08)"}`,
          },
        }}
      />
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
        { path: "/", element: renderPage(Home) },
        {
          path: "/termsOfServices",
          element: renderPage(TermsOfServices),
        },
        { path: "/contactUs", element: renderPage(ContactUs) },
        { path: "/helpCenter", element: renderPage(HelpCenter) },
        { path: "/privacyPolicy", element: renderPage(PrivacyPolicy) },
        { path: "/login", element: renderPage(Login) },
        { path: "/signup", element: renderPage(Signup) },
        {
          path: "/restaurants",
          element: (
            <ProtectedRoute>
              {renderPage(CategoryPage, {
                category: "Restaurant",
                title: "Restaurants",
                description: "Discover top-rated restaurants.",
              })}
            </ProtectedRoute>
          ),
        },
        {
          path: "/cafes",
          element: (
            <ProtectedRoute>
              {renderPage(CategoryPage, {
                category: "Cafe",
                title: "Cafes",
                description: "Explore the best cafes for a perfect break.",
              })}
            </ProtectedRoute>
          ),
        },
        {
          path: "/attractions",
          element: (
            <ProtectedRoute>
              {renderPage(CategoryPage, {
                category: "Attraction",
                title: "Attractions",
                description: "Discover top attractions across India.",
              })}
            </ProtectedRoute>
          ),
        },
        {
          path: "/hotels",
          element: (
            <ProtectedRoute>
              {renderPage(CategoryPage, {
                category: "Hotel",
                title: "Hotels",
                description: "Find the perfect hotel for your stay.",
              })}
            </ProtectedRoute>
          ),
        },
        {
          path: "/guesthouses",
          element: (
            <ProtectedRoute>
              {renderPage(CategoryPage, {
                category: "Guesthouse",
                title: "Guesthouses",
                description: "Find cozy and affordable guesthouses.",
              })}
            </ProtectedRoute>
          ),
        },
        {
          path: "/search",
          element: (
            <ProtectedRoute>{renderPage(SearchResults)}</ProtectedRoute>
          ),
        },
        {
          path: "/favorites",
          element: <ProtectedRoute>{renderPage(Favorites)}</ProtectedRoute>,
        },
        {
          path: "/map",
          element: <ProtectedRoute>{renderPage(MapView)}</ProtectedRoute>,
        },
        {
          path: "/profile",
          element: <ProtectedRoute>{renderPage(Profile)}</ProtectedRoute>,
        },
        {
          path: "/admin",
          element: (
            <ProtectedRoute adminOnly={true}>
              {renderPage(AdminDashboard)}
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
