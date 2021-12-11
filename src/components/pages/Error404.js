import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import error from '../../img/error-404-2.jpg';

const Error404 = () => {
        return (
            <Container className='text-center'>
                <img src={error} alt="imagen error 404" className='w-100' />
            </Container>
            
        );
    }

export default Error404;