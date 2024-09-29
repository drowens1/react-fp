import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from './ProductContext'
import { useContext, useState, useEffect } from 'react'
import { Alert } from "react-bootstrap";

function Product(props) {
    let params = useParams() // extracts route parameters for individual products /URLs
    let navigate = useNavigate() // allows programming navigating to different routes /URLs
    let { getProduct, deleteProduct } = useContext(ProductContext) // connects to Context, fetches (get...) and deletes (delete...) from server data
    let [product, setProduct] = useState() // stores fetched product data (initially undefined)
    let [error, setError] = useState() // tracks for error during fetch (initially null)

    useEffect(() => { // a React hook that automatically calls fetch function when the componant loads or when productId changes
        setError(null) // begins call with no error
        async function fetch() { // fetches backend product data and handles errors
            await getProduct(params.productId) // uses URL which holds productId and calls getProduct
                .then((product) => setProduct(product)) // sets new Product state using setProduct
                .catch((message) => setError(message)) // calls error if needed
        }
        fetch() // this is telling the function to fetch
    }, [params.productId, getProduct]) // these are dependencies for rendering this component

    function handleDeleteProduct(id) { // deletes product and navigates back to product list
        deleteProduct(id) // calls deleteProduct from Context
        navigate('/products') // redirects user to product list URL
    }

    function loading() {
        return <div className="w-25 text-center"><Spinner animation="border" /></div>
    } // product here is undefined ( product === undefined ) so function calls even when product data has not loaded yet

    function errorMessage() {
        return <Alert variant="danger">There was an error attempting to load this product: {error}</Alert>
    }

    function productCard() { // function to render product details
        let { id, productName, description, price } = product // extracts details from product state
        return (
            <Card className="align-self-start w-25">
                <Card.Body>
                <Card.Img variant="top" src={product.imageURL} alt={product.productName} />
                    <Card.Title>{productName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                    <Card.Text>
                        <strong>Price:</strong> <span>{price}</span>
                    </Card.Text>
                    <Link to={`/products/${id}/edit`} className="btn btn-primary mx-3">Edit</Link>
                    <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
                </Card.Body>
            </Card>

        )
    }
    if (error) return errorMessage() // existing error will render errorMessage function
    if (product === undefined) return loading() // renders loading function if product is still loading
    return product.id !== parseInt(params.productId) ? loading() : productCard() // if the productId doesnt match the URL (params.productId) then it will render the loading function
}

export default Product