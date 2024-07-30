import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1>Search Meals</h1>
          </Link>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
}
