import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <footer>Footer section</footer>
    </UserProvider>
  );
}

export default App;
