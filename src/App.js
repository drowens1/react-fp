import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import "./Products.json";
// import { ProductContext } from './ProductContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<h1>Welcome</h1>} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:productId/edit" element={<ProductForm />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="*" element={<h1>Product Not Found</h1>} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App