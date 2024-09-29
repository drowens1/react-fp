import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-light text-center p-3 mt-auto fixed-bottom">
            <Container>
                <p>© {new Date().getFullYear()} BST Student Marketplace. All Rights Reserved. Follow us on{' '}
                <a href="https://github.com/drowens1" target="_blank" rel="noopener noreferrer" classname="text-light ms-1">Github</a>
                </p>
            </Container>
        </footer>
    );
}

export default Footer