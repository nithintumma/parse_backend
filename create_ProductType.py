# create_ProductType.py

# Used for creating a new product type
# usage = createProductType.py -t <type> -d <description>
# arguments - { type: STRING (describes the type of the product)
#               description: STRING (describes any contraintes that products of this type should enforce)

import sys, getopt
import json, httplib
type = ''
description = ''
try:
  opts, args = getopt.getopt(sys.argv[1:], "ht:", ["type="])
except getopt.GetoptError:
  print "create_ProductType.py -t <type>"

for opt, arg in opts:
  if opt == '-h':
    print "create_ProductType.py -t <type>"
    sys.exit()
  elif opt in ("-t", "--type"):
    type = arg
description = raw_input("Input description for product type " + type + ": " )
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/ProductType', json.dumps({
    "type": type,  
    "description": description  
  }), {
         "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
          "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ"
        })
result = json.loads(connection.getresponse().read())
print result
