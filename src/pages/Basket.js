import React, {useEffect, useState} from "react";
import {fetchOneProduct} from "../http/productAPI";
import {createBasketProducts, fetchBasketProducts} from "../http/basketProductAPI";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

const Basket = () => {
    const [basket, setBasket] = useState([]);
    useEffect(() => {
        fetchBasketProducts().then(data => setBasket(data));
    }, []);
    return (
        <Container className="mt-3">
            { basket.map((item) => (
                <Row>
                    <Col md={6}>
                        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + item.product.img} />
                    </Col>
                    <Col md={6}>
                        <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32 }}
                        >
                            <h3>{item.product.price}₴</h3>
                        </Card>
                    </Col>
                </Row>
            ))}
            {basket.length > 0 ?
                <Row>
                    <Col md={6}>
                        <Card
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{ width: 300, height: 300, fontSize: 32 }}
                        ><h3>Итого</h3></Card>
                    </Col>
                    <Col md={6}>
                        <Card
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{ width: 300, height: 300, fontSize: 32 }}
                        >
                            <h3>{basket.reduce((accumulator, item) => accumulator + item.product.price, 0)}₴</h3>
                        </Card>
                    </Col>
                </Row>
                : undefined}
        </Container>
    )
}

export default Basket;