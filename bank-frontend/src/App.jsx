import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SignInHome from "./pages/SignInHome";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/DashBoard";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgetPassword";
import ForgotUsername from "./Pages/ForgetUsername";
import AccountList from "./Pages/AccountsList";
import Profile from "./Pages/Profile";
import Logout from "./Pages/Logout";
import OtpVerification from "./pages/OtpVerification";
function App() {

  return (
    <BrowserRouter>

      <Routes>
           
      
        <Route
          path="/"
          element={<SignInHome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
         <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/forgot-username" element={<ForgotUsername />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
         path="/create-account" 
         element={<CreateAccount />} />
         <Route path="/accounts" element={<AccountList/>}/>
      <Route path="/profile" element={<Profile/>}/>

      <Route path="/logout" element={<Logout />} />

      <Route
    path="/verify-otp"
    element={<OtpVerification />}
/>
      </Routes>
      

      

    </BrowserRouter>
  );
}

export default App;