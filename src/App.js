import "./assets/sass/main.scss";
import Dashboard from "./pages/Dashboard";
import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const WrongURL = () => <p>URL invalide. Essayez avec "/user/id".</p>

const App = () => {
  return (
    <Router>
      <Header />
      <main className="app-main-container">
        <Routes>
          <Route path="/user/:userId" element={<Dashboard />} />
          <Route path="*" element={<WrongURL />} />
        </Routes>
      </main>
      <Aside />
    </Router>
  );
};

export default App;
