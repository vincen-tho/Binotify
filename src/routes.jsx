import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

const PRESERVED = import.meta.glob("/src/pages/(_app|_404).jsx", {
  eager: true,
});
const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.jsx", { eager: true });

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: ROUTES[route].default };
});

function App() {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["_404"] || Fragment;
  return (
    <App>
      <Routes>
        {routes.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  );
}

export default App;
