import {
  Button,
  Col,
  Description,
  Image,
  Page,
  Row,
  Tag,
  Text,
} from '@geist-ui/react'
import Rating from '@material-ui/lab/Rating'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartToggle } from '../components'
import { useStoreActions, useStoreState } from '../hooks'
import { itemCategories } from '../model'

export default function ItemPage() {
  const menuItems = useStoreState((state) => state.menuItems)
  const params = useParams()
  const id = (params as any)?.id
  const targetMenuItem = menuItems.filter(
    (menuItem: { id: number }) => menuItem.id == Number(id),
  )[0]
  const fetchMenuItems = useStoreActions((actions) => actions.fetchMenuItems)

  useEffect(() => {
    fetchMenuItems()
  }, [fetchMenuItems])

  return (
    <Page size="large">
      {targetMenuItem && (
        <Row gap={0.8} style={{ marginBottom: '15px' }}>
          <Col span={16}>
            <Text h2>{targetMenuItem.name}</Text>
            <Text p>${targetMenuItem.price} / unit</Text>
            <Tag type="lite">{itemCategories[targetMenuItem.category]}</Tag>
            <br />
            <br />
            <Rating value={targetMenuItem.rating} readOnly />
            <br />
            <Row style={{ marginTop: '15px' }}>
              <Description title="Seller" content={targetMenuItem.seller} />
            </Row>
            <Row style={{ marginBottom: '15px' }}>
              <Text p>{targetMenuItem.description}</Text>
            </Row>
          </Col>
          <Col span={8}>
            <Row style={{ marginBottom: '15px' }}>
              <Image width={540} height={160} src={targetMenuItem.image} />
            </Row>
            <Row justify="center">
              <Col span={16}>
                <Button size="large" style={{ height: '60px' }}>
                  <Row>
                    <Text b style={{ marginRight: '10px' }}>
                      Add to cart
                    </Text>
                  </Row>
                  <CartToggle menuItem={targetMenuItem} />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Page>
  )
}
