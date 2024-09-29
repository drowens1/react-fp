import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { Link, Outlet, useLocation } from "react-router-dom"
import LoadingIndicator from './LoadingIndicator'
import { FormControl, Card, Button } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { ProductContext } from './ProductContext'
import Footer from './Footer'
import logo from './logo.png'

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    // state for storing the search term with search box in navbar
    const { products } = useContext(ProductContext);
    //Gets products from context
    const firstThreeProducts = products.slice(0, 3);
    // variable created to hold first three products
    const location = useLocation();

    return (
        <>
            <Navbar bg="dark" variant="dark" className="d-flex align-items-center">
                <Container>
                    <Navbar.Brand>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto d-flex align-items-center">
                        <p className="navbar-text mb-0">BST Student Marketplace</p>
                    </Nav>
                    <Nav className="ms-auto">
                    <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                        <Link to="/products" className="nav-link">View All</Link>
                        <Link to="/products/new" className="nav-link">Create Listing</Link>
                    </Nav>
                    <Form className="d-flex ms-2">
                        <FormControl
                            type="search"
                            placeholder="search"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        // updates search term on input change
                        />
                    </Form>
                    <Navbar.Text>
                        <LoadingIndicator />
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container className="mt-4">
                {location.pathname === "/" && (
                    <>
                        <h2>Featured Products</h2>
                        <Stack direction="horizontal" gap={3} className="flex-wrap">
                            {firstThreeProducts.map((product) => (
                                <Card key={product.id} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.imageURL} alt={product.productName} />
                                    <Card.Body>
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text>
                                            <strong>Price:</strong> ${product.price}
                                        </Card.Text>
                                        <Button variant="primary" as={Link} to={`/products/${product.id}`}>View</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Stack>
                    </>
                )}
            </Container>
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet context={[searchTerm]} /> {/* pass searchTerm to child components using context */}
            </Stack>
            <Footer />
        </>
    )
}

export default Home