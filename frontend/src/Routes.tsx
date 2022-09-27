import Layout from "components";
import About from "pages/About";
import Admin from "pages/Admin";
import SchoolClasses from "pages/Admin/SchoolClasses";
import Students from "pages/Admin/Students";
import Home from "pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />}>
            <Route path="schoolClasses" element={<SchoolClasses />} />
            <Route path="students" element={<Students />} />
          </Route>

          <Route
            path="*"
            element={
              <p
                style={{
                  height: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                There is nothing here.
              </p>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
