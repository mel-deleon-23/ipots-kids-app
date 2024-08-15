import "bootstrap/dist/css/bootstrap.min.css";
/* eslint-disable no-irregular-whitespace */
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TriviaMenu from "./components/Trivia/TriviaMenu";
import TriviaQuestion from "./components/Trivia/TriviaQuestion";
import TriviaSummary from "./components/Trivia/TriviaSummary";
import ReadStoryMenu from "./pages/ReadStory/ReadStoryMenu";
import Story from "./pages/ReadStory/Story";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Consent from "./pages/Consent";
import Ineligible from "./pages/Ineligible";
import Options from "./pages/Options";
import Username from "./pages/Username";
import Confirm from "./pages/Confirmation";
import Birth from "./pages/Dateofbirth";
import Parental from "./pages/Parental";
import Avatar from "./pages/Avatars";
import KidsCongra from "./pages/KidsCongrat";
import Kidprofile from "./pages/Kidprofile";
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
            <Route path="/readstory" element={<ReadStoryMenu />} />
            <Route path="/story/level/:level" element={<Story />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ipotskids" element={<iPOTSKIDS />} />
            <Route path="/iaccess" element={<iAccess />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/ineligible" element={<Ineligible />} />
            <Route path="/options" element={<Options />} />
            <Route path="/username" element={<Username />} />
            <Route path="/confirmation" element={<Confirm />} />
            <Route path="/dateofbirth" element={<Birth />} />
            <Route path="/parental" element={<Parental />} />
            <Route path="/avatars" element={<Avatar />} />
            <Route path="/kids-success" element={<KidsCongra />} />
            <Route path="/kids-profile" element={<Kidprofile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
