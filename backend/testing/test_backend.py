from flask import Flask
from flask import request, jsonify, Response
import requests, unittest, json
from MySupport import MySupport

seller_id = 0
item_id = 0


class BackendTests(unittest.TestCase):
    HOSTNAME = "localhost"
    PORT = 8080

    def suite():
        suite = unittest.TestSuite()
        suite.addTest(BackendTests("test_homepage_items"))
        suite.addTest(BackendTests("test_add_seller"))
        suite.addTest(BackendTests("test_add_item"))
        suite.addTest(BackendTests("test_seller_info"))
        suite.addTest(BackendTests("test_item_info"))
        suite.addTest(BackendTests("test_add_order"))
        suite.addTest(BackendTests("test_remove_item"))

        return suite

    def test_homepage_items(self):
        url = MySupport.url(self.HOSTNAME, self.PORT, "/homepage_items")
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["menu_items"])
        # expected = {"menu_items": []}
        # self.assertEqual(jso, expected)

    def test_add_seller(self):
        url = MySupport.url(self.HOSTNAME, self.PORT, "/add_seller")

        response = requests.post(url, json=None)
        self.assertEqual(response.status_code, 409)

        response = requests.post(
            url,
            json={
                "name": "Christine",
                "email": "christine12121223@gmail.com",
                "description": "I love baking cakes",
            },
        )
        # self.assertEqual(response.status_code, 409)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["seller_id"])
        # expected = {"seller_id": 1}
        # self.assertEqual(jso, expected)
        global seller_id
        seller_id = jso["seller_id"]

    def test_add_item(self):
        global seller_id
        url = MySupport.url(self.HOSTNAME, self.PORT, "/add_item/" + str(seller_id))

        response = requests.post(url, json=None)
        self.assertEqual(response.status_code, 409)

        response = requests.post(
            url,
            json={
                "name": "Blueberry muffin",
                "price": 5,
                "image": "https://www.onceuponachef.com/images/2014/07/Best-Blueberry-Muffins2-1024x660.jpg",
                "category": "BakeryItem",
                "qty_avail": 10,
                "description": "A blueberry muffin",
                "seller_id": seller_id,
            },
        )
        # self.assertEqual(response.status_code, 409)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["item_id"])
        global item_id
        item_id = jso["item_id"]

    def test_seller_info(self):
        global seller_id
        url = MySupport.url(self.HOSTNAME, self.PORT, "/seller_info/" + str(seller_id))
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["description"])
        self.assertIsNotNone(jso["email"])
        self.assertIsNotNone(jso["items"])
        self.assertIsNotNone(jso["name"])
        self.assertIsNotNone(jso["order_ids"])
        self.assertIsNotNone(jso["id"])

        # expected = {"menu_items": []}
        # self.assertEqual(jso, expected)

    def test_item_info(self):
        global seller_id
        global item_id
        url = MySupport.url(self.HOSTNAME, self.PORT, "/item_info/" + str(item_id))
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["description"])
        self.assertIsNotNone(jso["category"])
        self.assertIsNotNone(jso["image"])
        self.assertIsNotNone(jso["name"])
        self.assertIsNotNone(jso["price"])
        self.assertIsNotNone(jso["seller_id"])
        self.assertIsNotNone(jso["id"])

        # expected = {"menu_items": []}
        # self.assertEqual(jso, expected)

    def test_add_order(self):
        url = MySupport.url(self.HOSTNAME, self.PORT, "/add_order")

        response = requests.post(url, json=None)
        self.assertEqual(response.status_code, 409)

        response = requests.post(
            url,
            json={
                "Customer_Name": "John Doe",
                "items": [1],
                "deliveryAddress": "5600 Fifth Ave",
            },
        )
        # self.assertEqual(response.status_code, 409)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.content)

        jso = response.json()
        self.assertIsNotNone(jso["order_id"])
        # expected = {"seller_id": 1}
        # self.assertEqual(jso, expected)
        # global seller_id
        # seller_id = jso["seller_id"]

    def test_remove_item(self):
        global seller_id
        global item_id
        url = MySupport.url(self.HOSTNAME, self.PORT, "/remove_item/" + str(seller_id))
        response = requests.delete(url, json=None)
        self.assertEqual(response.status_code, 409)

        response = requests.delete(
            url,
            json={
                "name": "Chocolate muffin",
                "price": "4.5",
                "seller_id": seller_id,
                "id": item_id,
            },
        )
        # self.assertEqual(response.status_code, 409)
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    runner = unittest.TextTestRunner()
    runner.run(BackendTests.suite())
