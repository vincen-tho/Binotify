import { authState } from "@/atoms/authState";
import LayoutComponent from "@/components/LayoutComponent";
import { useRecoilState } from "recoil";

export default function App({ children }) {
  const auth = useRecoilState(authState);
  return (
    <div>
      {!auth[0]?.isAuth ? children : <LayoutComponent content={children} />}
    </div>
  );
}
