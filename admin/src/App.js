import { Sidebar } from "./component/sidebar/Sidebar";
import { Topbar } from "./component/topbar/Topbar";
import './App.css';
import { Home } from "./pages/home/Home";
import { UserList } from "./pages/userList/userList";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import { User } from "./pages/user/User";
import { NewUser } from "./pages/newUser/NewUser";
import { ProductList } from "./pages/productList/productList";
import { Product } from "./pages/product/product";
import { NewProduct } from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Topbar />
        <div className="container">
          <Sidebar />
          <Route exact path='/' element={<Home />} />

          <Route exact path='/users' element={<UserList />} />
          <Route exact path='/user/:userId' element={<User />} />
          <Route exact path='/newUser' element={<NewUser />} />
          <Route exact path='/movies' element={<ProductList />} />
          <Route exact path='/product/:productId' element={<Product />} />
          <Route exact path='/newproduct' element={<NewProduct />} />
        </div>

      </Routes>
    </Router>

  );
}

export default App;
