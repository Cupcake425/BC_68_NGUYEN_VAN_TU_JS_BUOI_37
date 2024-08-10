import React from "react";
import Home from "./pages/Home";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const NotificationContext = React.createContext();

function App() {
  const handleNotification = (content, type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };
  return (
    <>
      <NotificationContext.Provider value={{ handleNotification }}>
        <Home />
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
