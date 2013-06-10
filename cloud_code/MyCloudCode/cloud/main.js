
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// returns two random products of a given product type
Parse.Cloud.define("getProducts", function(request, response) {
  var type_name = request.params.type;
  var ProductType = Parse.Object.extend("ProductType");
  var type_query = new Parse.Query(ProductType);
  // type_query.equalTo();
  type_query.equalTo("type", "male_shoe");
  type_query.first({
    success : function(results) {
                var Product = Parse.Object.extend("Product");
                var type = results;
                // get the number of products
                var count = type.get("count");
                var rand1 = Math.floor(Math.random() * count);
                var rand2 = Math.floor(Math.random() * count);
				while (rand2 == rand1){
					rand2 = Math.floor(Math.random() * count);
				}
				// construct the query 
                var query = new Parse.Query(Product);
                // PFObject of ProductType
                query.equalTo("type", type);
               	query.equalTo("label", rand1);
                query.first({
                  success: function(results) {
                  	var first_product = results;
                    var query_2 = new Parse.Query(Product);
                    query_2.equalTo("type", type);
                    query_2.equalTo("label", rand2);
                    query_2.first({
                    	success: function(results_2) {
                    		var second_product = results_2;
                    		var json_return = {
                      			"id_1": first_product.id,
                      			"img_1": first_product.get("image"),
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
  var query = new Parse.Query(Parse.User);  
  query.first({
    success : function(results) {
      //gets the friends list
      var friends = results.get("friends");
      var count = friends.length;

      //selects a random index
      var rand = Math.floor(Math.random() * count);
      
      response.success(friends[rand]);
    },
    error: function(error){
      response.error("could not get random user");
   }
  });

});
