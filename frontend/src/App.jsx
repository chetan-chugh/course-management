import { Routes, Route, NavLink } from "react-router-dom";
import CourseList from "./pages/CourseList.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import EditCourse from "./pages/EditCourse.jsx";

export default function App() {
  const navLinkClass = ({ isActive }) =>
    `app-nav-link ${isActive ? "app-nav-link-active" : ""}`;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <NavLink to="/" className="app-brand">
            Course
          </NavLink>
          <nav className="app-nav">
            <NavLink to="/" end className={navLinkClass}>
              List
            </NavLink>
            <NavLink to="/courses/new" className={navLinkClass}>
              Add Course
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/new" element={<AddCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/edit" element={<EditCourse />} />
        </Routes>
      </main>
    </div>
  );
}