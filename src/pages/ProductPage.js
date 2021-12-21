import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from "../http/productAPI";
import {createBasketProducts} from "../http/basketProductAPI";

const ProductPage = () => {

    const [product, setProduct] = useState({ info: [], isInBasket: false })
    const { id } = useParams()
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, [])
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img} />
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32 }}
                    >
                        <h3>{product.price}₴</h3>
                        {product.isInBasket ? '' : <Button variant={"outline-dark"} onClick={async () => {
                            await createBasketProducts(product.id);
                            const newProduct = await fetchOneProduct(id);
                            setProduct(newProduct);
                        }}>Добавить в корзину</Button>}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Описание продукта</h2>
                {product.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'WhiteSmoke' : 'transparent', padding: 10 }} >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
}

export default ProductPage;