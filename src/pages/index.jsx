import LoginPage from "@/pages/login";
import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const auth = useRecoilValue(authState);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!auth.isAuth) return <LoginPage />;
  if (user.isAdmin == "true") {
    return <Navigate to="/subscription" />;
  }
  return <Navigate to="/songs" />;
};

export default HomePage;
