import InsertPage from "./pages/InsertPage";
import FindPage from "./pages/FindPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import IndexPage from "./pages/IndexPage";
import CollectionPage from "./pages/CollectionPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/insert" element={<InsertPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/delete" element={<DeletePage />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
