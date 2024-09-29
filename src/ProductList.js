import React, { useContext, useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { ProductContext } from './ProductContext'
import { Card, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import { FaSort } from 'react-icons/fa'

function ProductList() {
    const { products, deleteProduct } = useContext(ProductContext);
    let navigate = useNavigate();
    const [searchTerm] = useOutletContext();
    // gets search term from outlet context in navbar search box
    const [sortOrder, setSortOrder] = useState('default');
    // state for sorting order of item list

    function handleView(id) {
        navigate(`./${id}`);
    }

    function handleEdit(id) {
        navigate(`/products/${id}/edit`)
    }

    function handleDeleteProduct(id) {
        deleteProduct(id);
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'low-to-high') {
            return a.price - b.price;
        } else if (sortOrder === 'high-to-low') {
            return b.price - a.price;
        }
        return 0; // no sorting if 'default' is selected
    });

    const filteredProducts = sortedProducts.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1>Products</h1>
            <div className="d-flex justify-content-end mb-3" style={{ maxWidth: '200px' }}>
                <DropdownButton
                    id="dropdown-sort"
                    title={<><FaSort /> Sort by Price</>}
                    variant="outline-secondary"
                    size="sm"
                    onSelect={(e) => setSortOrder(e)}  // Handle selection
                >
                    <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                    <Dropdown.Item eventKey="low-to-high">Low to High</Dropdown.Item>
                    <Dropdown.Item eventKey="high-to-low">High to Low</Dropdown.Item>
                </DropdownButton>
            </div>
            <Stack direction="horizontal" gap={3} className="flex-wrap">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Card key={product.id} className="col-md-4 mb-4" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.imageURL} alt={product.productName} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    <strong>Price:</strong> ${product.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button variant="secondary" className="mx-2" onClick={() => handleView(product.id)}>View</Button>
                                <Button variant="primary" className="mx-2" onClick={() => handleEdit(product.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </Stack>
            <Outlet />
        </>
    );
}

export default ProductList