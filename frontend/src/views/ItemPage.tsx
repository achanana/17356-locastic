import React, { useContext } from "react";
import { LoctasticContext } from '../contexts/LoctasticContext';
import { useParams } from "react-router-dom";
import { Text, Row, Col, Page, Description, Tag, Image, Button } from '@geist-ui/react'
import { itemCategories } from '../App';
import { IconButton } from '@material-ui/core';

const ItemPage = () => {
    const { menuItems, customerCart, addItemToCart, removeItemFromCart } = useContext(LoctasticContext);
    const params = useParams()
    const id = (params as any)?.id
    const menuItem = menuItems.filter(menuItem => menuItem.id == Number(id))[0]

    return (
        <Page size='large'>
            <Row gap={.8} style={{ marginBottom: '15px' }}>
                <Col span={16}>
                    <Text h2>{menuItem.name}</Text>
                    <Text p>${menuItem.price} / unit</Text>
                    <Tag type='lite'>{itemCategories[menuItem.category]}</Tag>
                    <Row style={{ marginTop: '15px' }}>
                        <Description title='Seller' content={menuItem.seller} />
                    </Row>
                    <Row style={{ marginBottom: '15px' }}>
                        <Text p>{menuItem.description}</Text>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row style={{ marginBottom: '15px' }}>
                        <Image width={540} height={160} src={menuItem.image} />
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Button size='large' style={{ height: '60px', }}>
                                <Row><Text b style={{ marginRight: '10px' }}>Add to cart</Text></Row>
                                <IconButton color='secondary' onClick={()=>{removeItemFromCart(menuItem)}}>-</IconButton>
                                {customerCart.getQty(menuItem)}
                                <IconButton color='secondary' onClick={()=>{addItemToCart(menuItem)}}>+</IconButton>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Page>
    )
}

export default ItemPage