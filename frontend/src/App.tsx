import AppRoutes from "AppRoutes";
import { AuthContext, AuthContextData } from "contexts/AuthContext";
import { useState } from "react";
import "./assets/styles/custom.scss";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
