import Navbar from "./components/navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import iAccess from "./pages/iAccess";
import iPOTSKIDS from "./pages/iPOTSKIDS";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <main id="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ipotskids" element={<iPOTSKIDS/>} />
            <Route path="iaccess" element={<iAccess/>}/>
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
export default App;