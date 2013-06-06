
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// returns two random products of a given product type
Parse.Cloud.define("getProducts", function(request, response) {
  var type = request.params.type;
  var ProductType = Parse.Object.extend("ProductType");
  var type_query = new Parse.Query(ProductType);
  type_query.equalTo("type", type);
  type_query.find({
    success : function(results) {
                var Product = Parse.Object.extend("Product");
                var query = new Parse.Query(Product);
                query.equalTo("type", results[0]);
                query.find({
                  success: function(results) {
                    var length = results.length;
                    var rand1 = Math.floor(Math.random() * length);
                    var rand2 = Math.floor(Math.random() * length);
                    do
                    {
                      rand2 = Math.floor(Math.random() * length);
                    } while (rand2 == rand1);
                    var resp_list = [results[rand1], results[rand2]];
                    response.success(resp_list);
                  },
                  failure: function() {
                    response.error("could not retrieve products");
                  }
                })
              },
    failure: function() {
      response.error("product type not found");
    }
  });
});

Parse.Cloud.define("getUser", function() {
  response.success("not implemented yet");
});
