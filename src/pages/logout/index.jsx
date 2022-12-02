import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authState } from "@/atoms/authState";
import { useRecoilValue, useResetRecoilState } from "recoil";
import LoadingPage from "@/components/LoadingPage";

const LogoutPage = () => {
  const reset = useResetRecoilState(authState);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    reset();
    localStorage.clear();
  }, []);

  if (!auth.isAuth) return <Navigate to="/" />;
  return <LoadingPage />;
};

export default LogoutPage;
