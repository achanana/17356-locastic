from flask import Flask
from flask import request, jsonify, Response
import os
from flask_cors import CORS

backend_app = Flask(__name__)
CORS(backend_app)

next_order_id = 1
next_seller_id = 1
next_item_id = 1

orders = []
order_items = []
sellers = []

default_menu_items = [
    {
        'id': 1,
        'name': 'Blueberry muffin',
        'price': 5,
        'image': 'https://www.onceuponachef.com/images/2014/07/Best-Blueberry-Muffins2-1024x660.jpg',
        'seller': 'John',
        'category': 'BakeryItem',
        'description': 'A blueberry muffin'
    }
]

if (os.environ.get('GITHUB_ACTIONS')):
    menu_items = default_menu_items
else:
    menu_items = []


# Display all products on the homepage
@backend_app.route('/homepage_items', methods=['GET'])
def homepage_items():
    response_dict = {"menu_items": menu_items}
    response = jsonify(response_dict)
    response.status_code = 200
    return response

# Get information of a particular seller
@backend_app.route('/seller_info/<id>', methods=['GET'])
def seller_info(id):
    response = None
    for seller in sellers:
        if seller["id"] == int(id):
            response = jsonify(seller)
            break
    if response == None:
        print("here")
        response = jsonify({})
        response.status_code = 409
    else:
        response.status_code = 200
    return response

# Add/Place new order
@backend_app.route('/add_order', methods=['POST'])
def add_order():
    order = request.get_json()
    if order is None:
        return Response(status=409)
    if "items" not in order:
      return Response(status=409)


    global next_order_id
    order["id"] = next_order_id
    # Build response to return assigned order id to customer
    response = jsonify({"order_id": order["id"] })
    # response = jsonify(order)
    next_order_id += 1
    response.status_code = 200
    orders.append(order)

    print("added order")
    # Need to look for which items from the order
    # are sold by which sellers and add the order_id
    # to the respective seller_ids
    for item in order["items"]:
        for seller in sellers:
            if item in seller["items"]:
                seller["order_ids"].append(order["id"])
                break

    return response


# Add a new seller and return seller id for that particular seller
@backend_app.route('/add_seller', methods=['POST'])
def add_seller():
    seller = request.get_json()
    if seller is None:
        return Response(status=409)

    global next_seller_id
    seller["id"] = next_seller_id
    # Build response to return assigned seller id to seller
    response = jsonify({"seller_id": seller["id"] })
    next_seller_id += 1
    response.status_code = 200
    sellers.append(seller)

    return response



# Get all order_ids for the particular seller
@backend_app.route('/seller_orders/<seller_id>', methods=['GET'])
def seller_orders(seller_id):

    response = None
    for seller in sellers:
        if seller["id"] == seller_id:
            response = jsonify(seller['order_ids'])
            break
    if response == None:
        response = jsonify({})
        response.status_code = 409
    else:
        response.status_code = 200
    return response


# Add a new item to the product list for a seller
@backend_app.route('/add_item/<seller_id>', methods=['POST'])
def add_item(seller_id):
    if request.method == 'POST':
        item = request.get_json()

        if item is None:
            return Response(status=409)

        global next_item_id
        item["id"] = next_item_id
        next_item_id += 1

        menu_items.append(item)

        for seller in sellers:
          if seller["id"] == int(seller_id):
                seller["items"].append(item["id"])
                break

        # Build response to return item_id to seller
        # and also add to seller items
        response = jsonify({"item_id": item["id"] })
        response.status_code = 200

        return response




# Remove an item from the product list for a seller
@backend_app.route('/remove_item/<seller_id>', methods=['DELETE'])
def remove_item(seller_id):
    if request.method == 'DELETE':

        item = request.get_json()
        if item is None:
            return Response(status=409)

        flag = 0

        for seller in sellers:
            if seller["id"] == int(seller_id):

                if item["id"] in seller["items"]:
                    seller["items"].remove(item["id"])
                    flag = 1
                break


        for it in menu_items:
          if it["id"] == item["id"]:
                menu_items.remove(it)
                break

        if flag == 0:
            return Response(status=409)
        else:
            return Response(status=200)



# if __name__ == '__main__':
#     # manager_server.run(host="localhost", port=int(sys.argv[2]))
#     if (os.environ.get('GITHUB_ACTIONS')):
#         print("It was true")
#         menu_items = default_menu_items
#     else:
#         print("It wasn't true!")
#     port = int(os.environ.get('PORT'))
#     backend_app.run(host="0.0.0.0", port=port)

def create_app():
    port = int(os.environ.get('PORT'))
    # backend_app.run(host="127.0.0.1", port=port)
    return backend_app


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
