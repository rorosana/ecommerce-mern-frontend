import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

function Login() {
    function handleSubmit(){

    }
  return (
    <Container>
        <Row>
            <Col md={6} classname="login__form--container">
                <Form style={{width: "100%"}}>
                    <h1>Login to your account</h1>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Container type="email" placeholder="Enter email" value="" required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Container type="email" placeholder="Enter email" value="" required/>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={6}></Col>
        </Row>
    </Container>
  )
}

export default Login
