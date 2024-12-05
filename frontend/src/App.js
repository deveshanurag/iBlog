import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostPage from "./Pages/PostPage";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import BlogDetail from "./components/BlogDetail";
import WriteBlogPage from "./components/writeBlogPage";
import EditBlog from "./components/authentication/EditBlog";
import AboutPage from "./components/AboutPage";
const isAuthenticated = () => {
  return localStorage.getItem("userInfo") !== null;
};
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/about" element={<AboutPage />}></Route>
          <Route
            exact
            path="/post"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <BlogDetail />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/write"
            element={
              <ProtectedRoute>
                <WriteBlogPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
