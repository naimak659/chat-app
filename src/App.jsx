import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      {/* <Login /> */}
    </>
  );
}

export default App;
