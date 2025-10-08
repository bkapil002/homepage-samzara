import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import LoginForm from "./Admin/LoginForm ";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navebar from "./components/Navebar";
import BlogDetails from "./components/BlogDetails";
import NavbarSecond from "./componentsecond/NavbarSecond";
import HomeSecond from "./componentsecond/HomeSecond";
import SamzaraDisclaimer from "./components/SamzaraDisclaimer";
import SamzaraPrivacyPolicy from "./components/SamzaraPrivacyPolicy";
import ScrollButton from "./components/ScrollButton";

// Layout for public users
function PublicLayout() {
  return (
    <>
      <Navebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/disclaimer" element={<SamzaraDisclaimer />} />
        <Route path="/privacy-policy" element={<SamzaraPrivacyPolicy />} />
      </Routes>
      <ScrollButton/>
      <Footer />
    </>
  );
}

// Layout for logged-in admin
function AdminLayout() {
  return (
    <>
      <NavbarSecond />
      <HomeSecond />
    </>
  );
}

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/signin" element={<LoginForm />} />
      <Route
        path="/*"
        element={user ? <AdminLayout /> : <PublicLayout />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
