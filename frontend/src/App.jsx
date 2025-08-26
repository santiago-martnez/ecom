import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductsGrid from "./components/ProductsGrid";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import { ProductsProvider, ProductsContext } from "./context/ProductsContext";
import { PaymentsProvider } from "./context/PaymentsContext";
import Success from "./components/Succes";
import Failure from "./components/Failure";
import Pending from "./components/Pending";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useAuth } from "./context/AuthContext";
import Login from './components/Login'
import AgregarProducto from "./components/AgregarProductos";
function App() {
   const { token } = useAuth();
  return (
    <ProductsProvider>
      <PaymentsProvider>
        <Router>
          <Routes>

            <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />


              <Route
          path="/productos/nuevo"
          element={token ? <AgregarProducto /> : <Navigate to="/login" />}
        />

          <Route path="/login" element={<Login />}/>

            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<MainApp />} />

            


            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </Router>
      </PaymentsProvider>
    </ProductsProvider>
  );
}

function MainApp() {
  const { setFilteredCategory, cart } = React.useContext(ProductsContext);

  return (
    <div className="bg-green-100 text-white min-h-screen flex flex-col">
      <Navbar onFilter={setFilteredCategory} />

      <main className="flex-1 p-4 sm:p-8">
        <h1 className="text-3xl font-bold pb-4 text-black  text-green-900">Productos</h1>

        <div className="flex items-center space-x-4">
          <Cart />
          {cart.length > 0 && <Checkout products={cart} />}
        </div>

        <ProductsGrid />
      </main>

      <Footer />
    </div>
  );
}

export default App;
