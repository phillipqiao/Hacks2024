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
        <div className="linkContainer">  
          <Link to="/"><div><div>
        < img className = "logo" src="./logoBuddies.png" alt="Description" />
      </div>
      <div>
        < img className = "logo-text" src="./logoText.png" alt="Description" />
      </div></div></Link>
        </div>
        {/* <div>
          <Link to="/create">Create Your Post</Link>
        </div> */}
        <div className = "post-button-container">
          <Link to="/create" className="button-style">Create Your Post</Link>
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
