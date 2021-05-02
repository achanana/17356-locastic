import flask
import sys
from flask import request, jsonify, Response
import os

manager_server = flask.Flask(__name__)
manager_server.config["DEBUG"] = True

config_infor_list = []
instances_list = []

@manager_server.route('/config', methods=['POST'])
def create_config():
    content = request.get_json()
    if content is None:
        return Response(status=409)
    filename = content["name"]
    major_version = content["major"]
    minor_version = content["minor"]

    if filename is None or major_version is None or minor_version is None:
        return Response(status=409)
    global config_infor_list
    config_file_name = filename + "-" + major_version + "-" + minor_version + ".cfg"
    config_infor_list.append(config_file_name)
    f = open(config_file_name, "w")
    f.write(content)
    f.close()
    return Response(status=200)


@manager_server.route('/cfginfo', methods=['GET'])
def get_config_info():
    output_dict = {"files": config_infor_list}
    response = jsonify(output_dict)
    response.status_code = 200
    return response


if __name__ == '__main__':
    # manager_server.run(host="localhost", port=int(sys.argv[2]))
    manager_server.run(host="localhost", port=8080)