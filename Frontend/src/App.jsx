import InsertPage from "./pages/InsertPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/insert" element={<InsertPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
