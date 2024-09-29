import React, { createContext, useState, useEffect } from "react"
// createContext - to create a context for sharing data
// useState - to manage state within the component
// useEffect - to handle side effects like data fetching
import axios from "axios"
// axios is a promise-based HTTP client for making requests to a backend server

export const ProductContext = createContext()
//  creates AND exports a context for products
// holds the product-related data
// also holds the functions that will be accessed by the component

export const ProductProvider = (props) => {
    // defines and exports the ProductProvider component
    // acts as context provider, wrapping its children with context
    // provides product-related functionality
    // props - accepts children components to be wrapped inside this provider

  const [products, setProducts] = useState([])
    // state declaration
        // products - holds the array of products fetched from backend
        // setProducts - function to update the products state
        // initial state "[]" - an empty array signifying no products are loaded initially

  useEffect(() => {
    // side effect on mount:
        // this useEffect runs once when the ProductProvider component mounts
        //  the empty array "[]" means it wont re-run unless dependencies change
    async function getProducts() {
        // defines getProducts:
            // purpose is to call refreshProducts asynchronously to fetch data when component mounts 
      await refreshProducts()
    }
    getProducts()
        // immediately calls getProducts:
            // triggers fetching of products as soon as the component mounts
  }, []);

  function refreshProducts() {
    return axios.get("http://localhost:3001/products")
        // fetches "GET" all products from server
      .then(response => {
        setProducts(response.data)
        // line above updates products state with the newly fetched data
        // returns nothing directly but updates state
            // will cause a re-render in consuming components
      })
  }


  function getProduct(id) {
    // purpose is to fetch specific product using ID #
    return axios.get(`http://localhost:3001/products/${id}`)
    // GET request to retrieve product data by ID #
      .then(response =>
        new Promise((resolve) => resolve(response.data))
        // returns a Promise:
            // resolves with the product data if successful
      )
      .catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
            // rejects with the error message if there is a failure
      )
  }


  function deleteProduct(id) {
        // deletes a product by ID
    axios.delete(`http://localhost:3001/products/${id}`)
        // sends a DELETE request to URL
        .then(refreshProducts)
        // calls refreshProducts after deletion to ensure product list is updated
        // returns nothing directly, but ensures state updates after deletion
  }


  function addProduct(product) {
    // adds a new product
    return axios.post("http://localhost:3001/products", product)
    // sends a POST request to URL with new product data
    .then(response => {
      refreshProducts()
      // on success, calls refreshProducts to update product list
      return new Promise((resolve) => resolve(response.data))
      // returns a Promise:
        // resolves with added product data
    })
  }


  function updateProduct(product) {
    // updates an already exissting product
    return axios.put(`http://localhost:3001/products/${product.id}`, product)
    // sends a Put request to "put" new data, directed to URL / ID
    .then(response => {
      refreshProducts()
      // calls refreshProducts to refresh list post-update
      return new Promise((resolve) => resolve(response.data))
      // returns a Promise: resolves with updated product data
    })
  }

  return (
        // returns the ProductContext.Provider componetn

    <ProductContext.Provider
        // purpose is the wrap child components and provide context values to them
      value={{
        products, // current list of products
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct
            // above are functions to manage product data
      }}
    >
      {props.children}
    </ProductContext.Provider>
        // {props.children} displays child components
        // this allows any components wrapped by ProductProvider to access the context values
  )
}