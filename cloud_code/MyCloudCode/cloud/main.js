
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
  type_query.equalTo("type", "male_shoe");
  type_query.first({
    success : function(results) {
                var Product = Parse.Object.extend("Product");
                // get the number of products
                var count = results.get("count");
                var rand1 = Math.floor(Math.random() * count);
                var rand2 = Math.floor(Math.random() * count);
				while (rand2 != rand1){
					rand2 = Math.floor(Math.random() * count);
				}
				// construct the query 
                var query = new Parse.Query(Product);
                query.equalTo("type", results);
               	query.equalTo("label", rand1);
                query.first({
                  success: function(results) {
                  	var first_product = results;
                    var query = new Parse.Query(Product);
                    query.equalTo("type", type);
                    query.equalTo("label", rand2);
                    query.first({
                    	success: function(results) {
                    		var second_product = results;
                    		var json_return = {
                      			"id_1": second_product.id,
                      			"img_1": second_product.get("image"),
                      			"id_2": second_product.id,
                      			"img_2": second_product.get("image")
                    		}; 
                    		//var single_image = results[rand1].get("image");
                    		response.success(json_return);
                    	},
                    	error: function(error) {
                    		response.error("could not get second user");
                    	}
                    });
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
