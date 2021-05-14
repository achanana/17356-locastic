import os
import sys
from collections import OrderedDict

from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

backend_app = Flask(__name__)
CORS(backend_app)

if os.environ.get('RUNNING_ON_HEROKU'):
    client = MongoClient("mongodb+srv://admin:" + os.environ.get('MONGO_ATLAS_PWD') + "@cluster0.pkhxr.mongodb.net/loctastic?retryWrites=true&w=majority")
else:
    client = MongoClient(port=27017)

db = client.db

db.myColl.drop()
db.create_collection("myColl")  # Force create!


# Order Schema for testing
vexprOrder = {
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["order_id","items","date", "deliveryAddress"],
                "properties": {
                    "order_id": {
                        "bsonType": "int",
                        "description": "must be an int and is required"
                    },
                    "items": {
                        "bsonType": "array",
                        "items": {
                            "bsonType": "string"
                        },
                        "description": "must be an array of objects and is required"
                    },
                    "date": {
                        "bsonType": [ "string" ],
                        "description": "must be a string, but not required?"
                    },

                    "deliveryAddress": {
                        "bsonType": [ "string" ],
                        "description": "must be a string, but not required?"
                    }
                }
            }
        }

# cmd = OrderedDict([('collMod', 'myColl'),
#         ('validator', vexprOrder),
#         ('validationLevel', 'moderate')])

# db.command(cmd)


# Seller Schema for testing
vexprSeller = {
            "$jsonSchema": {
                    "bsonType": "object",
                    "required": ["id","name","order_ids", "items"],
                    "properties": {
                        "id":
                        {
                            "bsonType": "int",
                            "description": "must be an int and is required"
                        },
                        "name":
                        {
                            "bsonType": "string",
                            "description": "must be a string and is required"
                        },
                        "order_ids": {
                            "bsonType": "array",
                            "items":
                            {
                                "bsonType": "int"
                            },
                            "description": "must be an array of objects and is required"
                        },
                        "items": {
                            "bsonType": "array",
                            "items":
                            {
                                "bsonType": "string"
                            }
                        }
                    }
                }
        }

# cmd = OrderedDict([('collMod', 'myColl'),
#         ('validator', vexprSeller),
#         ('validationLevel', 'moderate')])

# db.command(cmd)

# Menu Item Schema for testing
vexprMenu = {
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["id","name","price", "qty_avail", "seller_id"],
                "properties": {
                    "id": {
                        "bsonType": "int",
                        "description": "must be an int and is required"
                    },
                    "name": {
                        "bsonType": "string",
                        "description": "must be a string and is required"
                    },
                    "price": {
                        "bsonType": "double",
                        "description": "must be a double and is required"
                    },
                    "qty_avail": {
                        "bsonType": "int",
                        "description": "must be an int and is required"
                    },
                    "seller_id": {
                        "bsonType": "int",
                        "description": "must be an int and is required"
                    }
                }
            }
}

# cmd = OrderedDict([('collMod', 'myColl'),
#         ('validator', vexprMenu),
#         ('validationLevel', 'moderate')])

# db.command(cmd)



# next_order_id = 1
# next_seller_id = 1
# next_item_id = 1


# orders = []
# db.create_collection("orders")  # Force create!
mongOrders = db["orders"]

# cmd = OrderedDict([('collMod', 'orders'),
#         ('validator', vexprOrder),
#         ('validationLevel', 'moderate')])

# db.command(cmd)



# order_items = []
# db.create_collection("order_items")  # Force create!
mongOrderItems = db["order_items"]


# sellers = []
# db.create_collection("sellers")  # Force create!
mongSellers = db["sellers"]

# cmd = OrderedDict([('collMod', 'sellers'),
#         ('validator', vexprSeller),
#         ('validationLevel', 'moderate')])

# db.command(cmd)


# menu_items = []
# db.create_collection("menu_items")  # Force create!
mongoMenuItems = db["menu_items"]

# cmd = OrderedDict([('collMod', 'menu_items'),
#         ('validator', vexprMenu),
#         ('validationLevel', 'moderate')])

# db.command(cmd)



mongoItemIDs = db["item_ids"]
mongoSellerIDs = db["seller_ids"]
mongoOrderIDs = db["order_ids"]

# order1 = {
#     "order_id": 3,
#     "items": ["Cake","Donuts"],
#     "date": "",
#     "deliveryAddress": ""
# }


# seller1 = {
#     "id": 1,
#     "name": "Christine",
#     "order_ids": [1,2,3],
#     "items": ["Cake","Donuts"]
# }

# menu_item1 = {
#     "id": 1,
#     "name": "Chocolate muffin",
#     "price": "4.5",
#     "qty_avail": 10,
#     "seller_id": 1
# }





# menu_items[1] = menu_item1
# sellers.push(seller1)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

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
        'description': 'A blueberry muffin',
        'seller_id': 100
    }
]


# Display all products on the homepage
@backend_app.route('/homepage_items', methods=['GET'])
def homepage_items():
    mItems = []
    default_menu_items = [
    {
        'id': 1,
        'name': 'Blueberry muffin',
        'price': 5,
        'image': 'https://www.onceuponachef.com/images/2014/07/Best-Blueberry-Muffins2-1024x660.jpg',
        'seller': 'John',
        'category': 'BakeryItem',
        'description': 'A blueberry muffin',
        'seller_id': 100
    }
    ]
#     mongoSellerIDs.insert_one("100")
    for item in mongoMenuItems.find():
        del(item['_id'])
        mItems.append(item)
    if (os.environ.get('GITHUB_ACTIONS') and mItems == []):
        mongoMenuItems.insert_one(default_menu_items[0])
        for item in mongoMenuItems.find():
            del(item['_id'])
            mItems.append(item)

    print(mItems)
    response_dict = {"menu_items": mItems} # Change to MONGO?
    response = jsonify(response_dict)
    response.status_code = 200
    return response

# Get information of a particular seller
@backend_app.route('/seller_info/<id>', methods=['GET'])
def seller_info(id):
    response = None
    for seller in mongSellers.find():
        if seller["id"] == int(id):
            del(seller['_id'])
            response = jsonify(seller)
            break
    if response == None:
        # print("here")
        response = jsonify({})
        response.status_code = 409
    else:
        response.status_code = 200
    return response

@backend_app.route('/add_order', methods=['POST'])
def add_order():
    order = request.get_json()
    print(order)
    if order is None:
        return Response(status=409)
    if "items" not in order:
      return Response(status=409)


    # Getting last used Order ID iterating through all the mongOrders
    oID = 0
    for oItems in mongoOrderIDs.find():
        oID = oItems["id"]

    oID += 1

    order["id"] = oID

    # Build response to return assigned order id to customer
    response = jsonify({"order_id": order["id"]})

    # response = jsonify(order)

    response.status_code = 200

    mongOrders.insert_one(order)
    mongoOrderIDs.insert_one(order)
    # orders.append(order) # Change this to MONGO!


    # print("added order")
    # Need to look for which items from the order
    # are sold by which sellers and add the order_id
    # to the respective seller_ids
    for item in order["items"]:
        for seller in mongSellers.find(): # CHANGED TO MONGO
            if item in seller["items"]:
                new_seller = seller
                new_seller["order_ids"].append(order["id"]) # CHANGED TO MONGO
                mongSellers.find_one_and_replace({'_id': seller["_id"]}, new_seller)
                break

    # print(mongOrders.find())

    return response


# Add a new seller and return seller id for that particular seller
@backend_app.route('/add_seller', methods=['POST'])
def add_seller():
    seller = request.get_json()
    if seller is None:
        return Response(status=409)

    # global next_seller_id
    # seller["id"] = next_seller_id # Change this to MONGO!

    # Getting last used Seller ID iterating through all the mongOrders
    sID = 0
    for sItems in mongoSellerIDs.find():
        sID = sItems["id"]

    sID += 1

    seller["id"] = sID

    # Build response to return assigned seller id to seller
    response = jsonify({"seller_id": seller["id"] })
    # next_seller_id += 1 # Change this to MONGO!
    response.status_code = 200

    mongSellers.insert_one(seller) # Change this to MONGO!
    mongoSellerIDs.insert_one(seller)

    return response



# Get all order_ids for the particular seller
@backend_app.route('/seller_orders/<seller_id>', methods=['GET'])
def seller_orders(seller_id):

    response = None
    for seller in mongSellers.find(): # Change this to MONGO!
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

        # Getting last used Menu Item ID iterating through all the mongOrders
        mID = 0
        for mItems in mongoItemIDs.find():
            mID = mItems["id"]

        mID += 1

        item["id"] = mID

        mongoMenuItems.insert_one(item) # Change this to MONGO!
        mongoItemIDs.insert_one(item)

        for seller in mongSellers.find():

        #   print("Seller ID in mongo: " + str(seller["id"]))
        #   print("Seller ID in schemas.py: " + str(seller_id))
          if seller["id"] == int(seller_id):
                # print(seller["items"])
                new_seller = seller
                new_seller["items"].append(item["id"]) # This could be a bug
                print(new_seller)

                # print(seller["items"])
                mongSellers.find_one_and_replace({'_id': seller["_id"]}, new_seller)
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
            print("item is None")
            return Response(status=409)

        flag = 0

        for seller in mongSellers.find():
            if seller["id"] == int(seller_id):
                if item["id"] in seller["items"]:
                    new_seller = seller
                    new_seller["items"].remove(item["id"]) # This could be a bug
                    mongSellers.find_one_and_replace({'_id': seller["_id"]}, new_seller)
                    flag = 1
                break


        for it in mongoMenuItems.find():
          if it["id"] == item["id"]:
                mongoMenuItems.delete_one(it)
                break

        if flag == 0:
            print("Flag zero")
            return Response(status=409)
        else:
            return Response(status=200)


# Get information of a particular item
@backend_app.route('/item_info/<id>', methods=['GET'])
def item_info(id):
    response = None
    for item in mongoMenuItems.find():
        if item["id"] == int(id):
            del(item['_id'])
            response = jsonify(item)
            break
    if response == None:
        # print("here")
        response = jsonify({})
        response.status_code = 409
    else:
        response.status_code = 200
    return response




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
