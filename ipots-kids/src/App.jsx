/* eslint-disable no-irregular-whitespace */
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
//import iAccess from "./pages/iAccess";
//import iPOTSKIDS from "./pages/iPOTSKIDS";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Benefits from "./pages/Benefits/Benefits";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main id="main">
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/ipotskids" element={<iPOTSKIDS/>} />
                <Route path="/iaccess" element={<iAccess/>}/>
                <Route path="/contact" element={<Contact />} />
                <Route path="/benefits" element={<Benefits />} />
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </>
  );
}
export default App;