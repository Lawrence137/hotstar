import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Marketplace from "./pages/Marketplace";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./admin/Admin";
import CloudinaryUpload from "./components/CloudinaryUpload"; // Import CloudinaryUpload

function App() {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/upload" element={<CloudinaryUpload />} /> {/* Add a route for the uploader */}
              </Routes>
              <Footer />
            </>
          }
        />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
