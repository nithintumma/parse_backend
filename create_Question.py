# create_Question.py

# Used for creating a new question
# usage = createProductType.py -t <type> 
# arguments - { type: STRING (describes the type of the product)
#               question: STRING (the question that will be prompted to the user)

import sys, getopt
import json, httplib, urllib

product_types = {"artist": "B8VyoXtiFm", "movie": "xgjLaAF8cC", "shirt": "NOXSpiVlla", "shoe": "s6OhTbiVr0"}

type = ''
description = ''
question = ''
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
question = raw_input("Input question for product type " + type + ": " )
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/classes/Question', json.dumps({
    "type": type,  
    "description": description  
  }), {
         "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
          "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ"
        })
result = json.loads(connection.getresponse().read())
print result
