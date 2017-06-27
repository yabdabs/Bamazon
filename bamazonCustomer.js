var inquirer= require("inquirer");
var mysql= require("mysql");

var ID;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root", 	
	password: "",
	database: "Bamazon"
});


	connection.connect(function(err){
		if(err) throw err;
		console.log("connected as id " + connection.threadID);

		connection.query("SELECT * FROM Products", function(err, res){
			if(err) throw err;
			// console.log(res);

				var view="";
				for(var i=0; i<res.length; i++){
					view += "Item ID: " + res[i].item_id + "\n";
					view += "Product Name: " + res[i].product_name + "\n";
					view += "Department Name: " + res[i].department_name + "\n";
					view += "Price: " + res[i].price + "\n";
					view += "Stock Quantity: " + res[i].stock_quantity + "\n";
					view += "-------------------------------------------------------\n"

				}
				console.log(view);

				askId(res);	
			
		});
	});



function askId(res){
	inquirer.prompt([
	{
		name:"productID",
		type: "text",
		message: "what is the ID of the product you would like to buy?"
	}
	]).then(function(answers){

		if(isNaN(answers.productID)){
			console.log("That not a number");
			askId();
		}
		else{
			console.log("that's a number");
			ID = res[answers.productID -1];
			console.log(ID);
			askUnits(ID, res);	
		}
	});
}

function askUnits(product, res){
	inquirer.prompt([
	{
		name:"numUnits",
		type: "text",
		message: "how many units of the product would you like to buy?"
	}
	]).then(function(answers2){
		if(isNaN(answers2.numUnits)){
			console.log("That's not a number");
			askUnits(product, res);
		}
		else{
			console.log("that's a number");
			if(product.stock_quantity > answers2.numUnits){
				console.log("Attempting to update the database...");

				var amount= product.stock_quantity - answers2.numUnits;

				updateDatabase(amount, product.item_id, answers2, product);
			}
			else{
				console.log("Insufficient quantity!");	
				askId(res);
			}

		}
	});
}

function updateDatabase(amount, productId, answers2, product){
	connection.query("UPDATE Products SET ? WHERE ?", 
		[
			{
				stock_quantity: amount
			},
			{
				item_id: productId
			}
		],
		function(error){
			if(error) throw err;
			console.log("stock successfully updated");
			console.log("total cost of you're purchase: $" + answers2.numUnits * product.price);

			connection.end();


		}
	);
}


//fixed for undefined productID;