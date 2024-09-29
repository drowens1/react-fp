import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { Link, Outlet } from "react-router-dom"
import LoadingIndicator from './LoadingIndicator'
import logo from './logo.png'
import { FormControl } from 'react-bootstrap'
import { useState } from 'react'
import Footer from './Footer'

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
        // state for storing the search term with search box in navbar

    return (
        <>
            <Navbar bg="dark" variant="dark">
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
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Link to="/products" className="nav-link">Products</Link>
                        <Link to="/products/new" className="nav-link">New Product</Link>
                        <Link to="/about" className="nav-link">About</Link>
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
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet context={[searchTerm]} /> {/* pass searchTerm to child components using context */}
            </Stack>
            <Footer />
        </>
    )
}

export default Home