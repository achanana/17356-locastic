from flask import Flask
from flask import request, jsonify, Response

app = Flask(__name__)

orders = []
order = {
    "items": [1,2,3]
    "date": 
    "deliveryAddress":
}
order_items = []
sellers = []
menu_items = []

seller1 = {
    "id": 1,
    "name": "Christine",
}

menu_item1 = {
    "id": 1,
    "name": "Chocolate muffin",
    "price": "4.5",
    "qty_avail": 10,
    "seller_id": 1,
}

next_order_id = 1
next_seller_id = 1

menu_items[1] = menu_item1
sellers.push(seller1)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/homepage_items', methods=['GET'])
def homepage_items():
    response_dict = {"menu_items": menu_items}
    response = jsonify(response_dict)
    response.status_code = 200
    return response

@app.route('/seller_info/<id>', methods=['GET'])
def seller_info(id):
    response = None
    for seller in sellers:
        if seller[id] == id:
            response = jsonify(seller[id])
            break
    if response == None:
        response.status_code = 409
    else:
        reponse.status_code = 200
    return response

@app.route('/add_order', methods=['POST'])
def add_order():
    order = request.get_json()
    if order is None:
        return Response(status=409)

    orders.append(order)

    return Response(status=200)


@app.route('/add_seller', methods=['POST'])
def add_seller():
    seller = request.get_json()
    if seller is None:
        return Response(status=409)
    
    sellers.append(seller)




@app.route('/seller_orders/<seller_id>', methods=['GET'])
def seller_orders(seller_id):
    
    
    
    

'''
Order
    - add an order, includes all the items included

Seller
    - verify login credentials
    - list of orders placed for your items
    - mark an order item as delivered -- basically update the status of orders

    - add a new item
    - remove an existing item
'''