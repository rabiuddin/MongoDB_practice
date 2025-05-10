import InsertPage from "./pages/InsertPage";
import FindPage from "./pages/FindPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/insert" element={<InsertPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/delete" element={<DeletePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
