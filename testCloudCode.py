import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/functions/getProducts', json.dumps({
       "type": "shirt"
     }), {
       "X-Parse-Application-Id": "dMu8BAni6T7g63aDFCkO6nQaqvtBzh1FRm5PdQr7",
       "X-Parse-REST-API-Key": "BzMM6tuCdpZSeccZv2K62CNLa9FCQEWbsCiDLNYJ",
       "Content-Type": "application/json"
     })
results = json.loads(connection.getresponse().read())
for result in results["result"]:
	print "a"
