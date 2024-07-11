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
import Home from "./pages/Home/Home.jsx";
import HomeRight from "./components/Home/HomeRight/HomeRight.jsx";
import Messages from "./pages/messages/index.jsx";
import Notification from "./pages/notification/index.jsx";
import Settings from "./pages/settings/index.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/" element={<HomeRight />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
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
