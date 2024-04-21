import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ViewContact from "./Pages/ViewContact";
import EditContact from "./Pages/EditContact";
import AddContact from "./Pages/AddContact";
import Footer from "./Components/Footer";

const App = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/contact/:id" Component={ViewContact} />
        <Route path="/contact/edit/:id" Component={EditContact} />
        <Route path="/addContact" Component={AddContact} />
      </Routes>

      {/* Page footer */}
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
