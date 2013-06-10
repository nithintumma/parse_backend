import json,httplib
id = '5HUotzayVP'
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('PUT', '/1/classes/ProductType/' + id, json.dumps({
       "count": {
         "__op": "Increment",
         "amount": 1
       }
     }), {
       "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
       "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result