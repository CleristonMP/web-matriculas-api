import { AuthContext, AuthContextData } from "AuthContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "Routes";
import "./assets/styles/custom.scss";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <AppRoutes />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
