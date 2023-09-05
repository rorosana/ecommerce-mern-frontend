/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "../axios";
import "../css/NewProduct.css";
import { useCreateProductMutation } from "../services/appAPI";
import { useNavigate, Link } from "react-router-dom";
import { Col, Container, Row, Form, Alert, Button } from "react-bootstrap";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

  function handleRemoveImg(imgObj){
    setImgToRemove(imgObj.public_id);
    axios.delete(`/images/${imgObj.public_id}`)
    .then((res) => {
      setImgToRemove(null);
      setImages(prev => prev.filter((img) => img.public_id !== imgObj.public_id));
    })
    .catch((e) => console.log(e));
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!name || !description || !price || !category || !images.length){
        return alert("Please fill out all the fields");
  }
  createProduct({name, description, price, category, images}).then(({data}) => {
    if(data.length > 0){
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  })
}

  function showWidget(){
    const widget = window.cloudinary.createUploadWidget({
        cloudName: 'ddkr2xw2j',
        uploadPreset: "p3wgqjen"
    },
    (error, result) => {
        if(!error && result.event === "success"){
            setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        }
    }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a Product</h1>
            {isSuccess && <Alert variant="success">Product created with success</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{height:"100px"}}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                style={{height:"100px"}}
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
              <Form.Label>Product Category</Form.Label>
              <Form.Select>
                <option disabled selected> -- Select One -- </option>
                <option value="technology"> Technology </option>
                <option value="tablets"> Tablets </option>
                <option value="phones"> Phones </option>
                <option value="laptops"> Laptops </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>Upload Images</Button>
              <div className="images-preview-container">
                {images.map((img) => (
                    <div className="image-preview">
                        < img src={img.url} />
                        <i className="fa-solid fa-circle-xmark" onClick={ () =>handleRemoveImg(img) }></i>
                    </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
            <p>
              Don't have an account?<Link to="/signup">Create account</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
