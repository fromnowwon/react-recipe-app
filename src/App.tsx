import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import SearchResults from "./pages/SearchResults";
import CategoryList from "./pages/CategoryList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category-list/:category" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
