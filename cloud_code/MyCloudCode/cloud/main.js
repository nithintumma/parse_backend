
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
               query.include("type");
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
                    var json_return = {
                      "id_1": results[rand1].id,
                      "img_1": results[rand1].get("image"),
                      "id_2": results[rand2].id,
                      "img_2": results[rand2].get("image")
                    };
                    var single_image = results[rand1].get("image");
                    response.success(single_image);
             },
            error: function(error){
              response.error("could not find user");
           }});
    },
    error: function(error){
      response.error("could not load product type");       
    }});
});

// returns a random useri_info from a users friend list
Parse.Cloud.define("getRandomFriend", function(request, response) {
  var User = Parse.Object.extend(Parse.User);
});
