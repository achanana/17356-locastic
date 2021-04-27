from flask import Flask
from flask import request, jsonify, Response

backend_app = Flask(__name__)

next_order_id = 1
next_seller_id = 1
next_item_id = 1

orders = []
order_items = []
sellers = []
menu_items = []

# order = {
#     "order_id": 3
#     "items": [1,2,3]
#     "date": 
#     "deliveryAddress":
# }


# seller1 = {
#     "id": 1,
#     "name": "Christine",
#     "order_ids": [1,2,3].
#     "items": ["Cake","Donuts"]
# }

# menu_item1 = {
#     "id": 1,
#     "name": "Chocolate muffin",
#     "price": "4.5",
#     "qty_avail": 10,
#     "seller_id": 1,
# }



# menu_items[1] = menu_item1
# sellers.push(seller1)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'


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
        if seller["id"] == id:
            response = jsonify(seller)
            break
    if response == None:
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

    orders.append(order)
    # Need to look for which items from the order
    # are sold by which sellers and add the order_id
    # to the respective seller_ids
    return Response(status=200)


# Add a new seller and return seller id for that particular seller
@backend_app.route('/add_seller', methods=['POST'])
def add_seller():
    seller = request.get_json()
    if seller is None:
        return Response(status=409)

    global next_seller_id
    seller["id"] = next_seller_id
    next_seller_id += 1

    sellers.append(seller)
    #  Probably need to return seller id to seller too
    return Response(status=200)



# Get all order_ids for the particular seller
@backend_app.route('/seller_orders/<seller_id>', methods=['GET'])
def seller_orders(seller_id):

    response = None
    for seller in sellers:
        if seller["id"] == seller_id:
            response = jsonify(seller['order_ids'])
            break
    if response == None:
        response.status_code = 409
    else:
        response.status_code = 200
    return response
    
    
# Add a new item to the product list for a seller
@backend_app.route('/add_item/<seller_id>', methods=['GET'])
def add_item(seller_id):

    item = request.get_json()
    if item is None:
        return Response(status=409)

    global next_item_id
    item["id"] = next_item_id
    next_item_id += 1

    menu_items.append(item)

    for seller in sellers:
       if seller["id"] == seller_id:
            seller["items"].append(item["id"])
            break

    #  Probably need to return item_id to seller too?
    return Response(status=200)




# Remove an item from the product list for a seller
@backend_app.route('/add_item/<seller_id>', methods=['GET'])
def remove_item(seller_id):

    item = request.get_json()
    if item is None:
        return Response(status=409)

    flag = 0
    for seller in sellers:
        if seller["id"] == seller_id:
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



if __name__ == '__main__':
    # manager_server.run(host="localhost", port=int(sys.argv[2]))
    backend_app.run(host="localhost", port=8080)


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