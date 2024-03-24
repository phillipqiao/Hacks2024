import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
// import SearchBar from "./Components/SearchBar"


function App() {
  return (
    <BrowserRouter>
      {/* <div className="App">
        <SearchBar placeholder="Enter a Sourse Name..."/>
      </div> */}

      <nav>
        <h1 className = "web-name">Study Buddies</h1>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/create">Create Your Post</Link>
        </div>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
