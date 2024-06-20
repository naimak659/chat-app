import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <ToastContainer />
      <Register />
      {/* <Login /> */}
    </>
  );
}

export default App;
