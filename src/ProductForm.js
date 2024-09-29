import { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from './ProductContext';

function ProductForm() {
  let params = useParams();
  let { getProduct, addProduct, updateProduct } = useContext(ProductContext);
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    id: params.productId,
    productName: "",
    description: "",
    price: "",
    imageURL: "",
    condition: "",
    location: ""
  });

  useEffect(() => {
    if (params.productId) {
      getProduct(params.productId).then((data) => setProduct(data));
    }
  }, [params.productId, getProduct]);

  function handleChange(event) {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const action = params.productId ? updateProduct : addProduct;
    action(product).then((newProduct) => navigate(`/products/${newProduct.id}`));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Item For Sale</Form.Label>
        <Form.Control type="text" name="productName" value={product.productName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Briefly Describe the Item For Sale</Form.Label>
        <Form.Control type="text" name="description" value={product.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price of Item</Form.Label>
        <Form.Control type="number" name="price" value={product.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="imageURL" value={product.imageURL} onChange={handleChange} placeholder='https://www.example.com/example.jpg' />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Condition</Form.Label>
        <Form.Control type="text" name="condition" value={product.condition} onChange={handleChange} placeholder='New or Used' />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" name="location" value={product.location} onChange={handleChange} placeholder='City, State' />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
}

export default ProductForm