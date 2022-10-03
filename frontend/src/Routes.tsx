import Layout from "components";
import CustomRouter from "components/CustomRouter";
import About from "pages/About";
import Admin from "pages/Admin";
import Auth from "pages/Admin/Auth";
import Login from "pages/Admin/Auth/Login";
import SchoolClassesList from "pages/Admin/SchoolClasses/SchoolClassesList";
import Table from "pages/Admin/SchoolClasses/Table";
import StudentDetails from "pages/Admin/Students/StudentDetails";
import StudentsList from "pages/Admin/Students/StudentsList";
import UserDetails from "pages/Admin/Users/UserDetails";
import UsersList from "pages/Admin/Users/UsersList";
import Welcome from "pages/Admin/Welcome";
import Home from "pages/Home";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <CustomRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />}/>
            <Route path="recover" element={ <h2 style={{
                  height: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}>Under construction!</h2> }/>
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="schoolClasses/:schoolClassId" element={<Table />} />
            <Route path="schoolClasses" element={<SchoolClassesList />} />
            <Route path="students/:studentId" element={<StudentDetails />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="users/:userId" element={<UserDetails />} />
            <Route path="users" element={<UsersList />} />
          </Route>

          <Route
            path="*"
            element={
              <h2
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
              </h2>
            }
          />
        </Route>
      </Routes>
    </CustomRouter>
  );
};

export default AppRoutes;
