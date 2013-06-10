# create_Question.py

# Used for creating a new question
# usage = createProductType.py -t <type> 
# arguments - { type: STRING (describes the type of the product)
#               question: STRING (the question that will be prompted to the user)

import sys, getopt
import json, httplib, urllib
import os
os.chdir("resources/images")
product_types = {"artist": "B8VyoXtiFm", "movie": "xgjLaAF8cC", "shirt": "NOXSpiVlla", "shoe": "s6OhTbiVr0", "male_shoe": "5HUotzayVP"}

type = ''
description = ''
name = ''
image_file = ''
try:
  opts, args = getopt.getopt(sys.argv[1:], "ht:n::i:", ["type=", "name=", "image="])
except getopt.GetoptError:
  print "create_ProductType.py -t <type> -n <name> -i <image filename>"

for opt, arg in opts:
  if opt == '-h':
    print "create_ProductType.py -t <type> -n <name> -i <image filename>"
    sys.exit()
  elif opt in ("-t", "--type"):
    type = arg
  elif opt in ("-n", "--name"):
    name = arg
  elif opt in ("-i", "--image"):
    print "image found"
    image_file = arg
# get the description
description = raw_input("Input product description for " + name + ": ")
img_path = "resources/images/" + image_file
# load the image to the Parse cloud
img_connection = httplib.HTTPSConnection('api.parse.com', 443)
img_connection.connect()
img_connection.request("POST", "/1/files/image_file", open(image_file, "r") ,{
    "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
    "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ",
    "Content-Type": "image/png"
    })
img_result = json.loads(img_connection.getresponse().read())
img_name = img_result["name"]

# figure out what the id of the productType is 
try:
  id = product_types[type]
except KeyError:
  print "Product type not supported"
  sys.exit()

# open up the connection to create the product
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/Product', json.dumps({
    "type": {
        "__type": "Pointer",
        "className": "ProductType",
        "objectId": id
      },
    "name": name,
    "image": {
        "name": img_name,
        "__type": "File"
      },
    "description": description  
  }), {
         "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
          "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ"
        })
result = json.loads(connection.getresponse().read())
print result

