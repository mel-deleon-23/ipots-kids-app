
import 'bootstrap/dist/css/bootstrap.min.css';
/* eslint-disable no-irregular-whitespace */
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

import Contact from "./pages/Contact";
import TriviaMenu from "./components/TriviaMenu";
import TriviaQuestion from './components/TriviaQuestion';
import TriviaSummary from "./components/TriviaSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Benefits from "./pages/Benefits/Benefits";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main id="main">
          <Routes>

            <Route path="/trivia" element={<TriviaMenu />} />
            <Route path="/question/level/:level" element={<TriviaQuestion />} />
            <Route path="/summary" element={<TriviaSummary />} />
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