import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { DataProvider } from "./GlobalState";
import HomePage from "./pages/HomePage";

const App = () => {
   return (
      <DataProvider>
         <Router>
            <div className="app">
               <Header />
               <Routes>
                  <Route path="/" element={<HomePage />} />
               </Routes>
            </div>
         </Router>
      </DataProvider>
   );
};

export default App;
