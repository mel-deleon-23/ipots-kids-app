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
import ParentalInEligible from "./pages/ParentalIneligible";
import Children from "./pages/Children";
import Avatar from "./pages/Avatars";
import KidsCongra from "./pages/KidsCongrat";
import Kidprofile from "./pages/Kidprofile";
import TeacherCongrat from "./pages/TeacherCongrat";
import TeacherProfile from "./pages/TeacherProfile";
import ParentsCongrat from "./pages/ParentsCongrat";
import ParentsProfile from "./pages/ParentsProfile";
import Unsuitable from "./pages/Unsuitable";
import ChangePassword from "./pages/ChangePassword";
import { AuthProvider } from "./pages/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import IaccessConfirm from "./pages/IAccessConfirm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Benefits from "./pages/Benefits/Benefits";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main id="main">
            <Routes>
              <Route path="/trivia" element={<TriviaMenu />} />
              <Route
                path="/question/level/:level"
                element={<TriviaQuestion />}
              />
              <Route path="/summary" element={<TriviaSummary />} />
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
              <Route
                path="/parental-ineligible"
                element={<ParentalInEligible />}
              />
              <Route path="/children-number" element={<Children />} />
              <Route path="/avatars" element={<Avatar />} />
              <Route path="/kids-success" element={<KidsCongra />} />
              {/* <Route path="/kids-profile" element={<Kidprofile />} /> */}
              <Route path="/teachers-success" element={<TeacherCongrat />} />
              {/* <Route path="/teachers-profile" element={<TeacherProfile />} /> */}
              <Route path="/parents-success" element={<ParentsCongrat />} />
              {/* <Route path="/parents-profile" element={<ParentsProfile />} /> */}
              <Route path="/unsuitable" element={<Unsuitable />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route
                path="/kids-profile"
                element={
                  <ProtectedRoute>
                    <Kidprofile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teachers-profile"
                element={
                  <ProtectedRoute>
                    <TeacherProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parents-profile"
                element={
                  <ProtectedRoute>
                    <ParentsProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/iaccess-confirmation"
                element={<IaccessConfirm />}
              />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
export default App;
