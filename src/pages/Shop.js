import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchProducts, fetchTypes } from "../http/productAPI";
import Pages from "../components/Pages";

const LIMIT = 12;

const Shop = observer(() => {
    const { product } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null, null, 1, LIMIT).then(data => {
            product.setProducts(data)
            product.setTotalCount(data.length)
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, LIMIT).then(data => {
            product.setProducts(data)
            product.setTotalCount(data.length)
        })
    }, [product.page, product.selectedType, product.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop;