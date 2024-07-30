import Navbar from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import About from "./pages/About";
import IAccess from "./pages/iAccess";
import IPOTSKIDS from "./pages/iPotskids";
import Contact from "./pages/Contact";
import TriviaMenu from "./components/TriviaMenu";
import TriviaQuestion from './components/TriviaQuestion';
import TriviaSummary from "./components/TriviaSummary";
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
            <Route path="/ipotskids" element={<IPOTSKIDS/>} />
            <Route path="/iaccess" element={<IAccess/>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/trivia" element={<TriviaMenu />} />
            <Route path="/question/level/:level" element={<TriviaQuestion />} />
            <Route path="/summary" element={<TriviaSummary />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
export default App;