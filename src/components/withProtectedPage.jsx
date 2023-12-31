import { useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState";
import PageNotFound from "@/pages/_404";

function withProtectedPage(Component, FallbackComponent) {
  return function WithProtectedPage() {
    const auth = useRecoilValue(authState);
    if (!auth.isAuth) {
      return FallbackComponent ? <FallbackComponent /> : <PageNotFound />;
    }
    return <Component />;
  };
}

export default withProtectedPage;
