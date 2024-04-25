import { Routes, Route, Navigate } from "react-router-dom";
import StaffDashboard from "./Pages/StaffDashboard.tsx";
import ProfessionalDashboard from "./Pages/ProfessionalDashboard.tsx";
import EmployerDashboard from "./Pages/EmployerDashboard.tsx";
import AccountTypeSelector from "./Pages/AccountTypeSelector.tsx";
import SignUpProfessional from "./Pages/SignUpProfessional.tsx";
import Navigation from "./Components/Navigation/Navigation.tsx";
import SignUpEmployer from "./Pages/SignUpEmployer.tsx";
import SignIn from "./Pages/SignIn.tsx";
import Home from "./Pages/Home.tsx";
import StaffRootAccount from "./Pages/StaffRootAccount.tsx";
import ChangePassword from "./Components/StaffDashboardComponents/ChangePassword.tsx";
import ChangePasswordProf from "./Components/ProfessionalDashboardComponents/ChangePasswordProf.tsx";
import "./App.css";

function logOut() {
  localStorage.clear();
  return <Navigate to="/signin" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation accountName="Sign In" />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<AccountTypeSelector />} />
        <Route path="signup/employer" element={<SignUpEmployer />} />
        <Route path="signup/professional" element={<SignUpProfessional />} />
      </Route>

      <Route path="/professional" element={<ProfessionalDashboard />} />

      <Route path="/employer" element={<EmployerDashboard />} />

      <Route path="/staff" element={<StaffDashboard />} />

      <Route path="/changepassword" element={<ChangePassword />} />

      <Route path="/changepasswordprof" element={<ChangePasswordProf />} />

      <Route path="/staffroot" element={<StaffRootAccount />} />
    </Routes>
  );
}

export default App;
