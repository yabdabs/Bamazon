var inquirer= require("inquirer");
var mysql= require("mysql")
var cliTable= require("cli-table");
var table;
var itemsArray= [];

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

		displayOptions();

});


function displayOptions(){
	inquirer.prompt([
			{
				type: "list",
				name: "options",
				message: "What would you like to do?",
				choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
			}
		]).then(function(answers){

				switch(answers.options){

					case "View Products for Sale":
						viewItems();
						break;

					case "View Low Inventory":
						viewLow();
						break;

					case "Add to Inventory":
						addInventory();
						break;

					// case "Add New Product":
					// 	addProduct();
					// 	break;

					case "Quit":
						quit();
						break;

					default:
						viewItems();
						break;
				}
		});

		console.log("\n");
}

function viewItems(){
	connection.query("SELECT * FROM Products", function(err, res){	
			if(err) throw err;
			// console.log(res);

			table= new cliTable({
				head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
				// colWidths: [100, 200]
			});

			for(var i=0; i<res.length; i++){
				table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
			}

			console.log(table.toString());

			displayOptions();
			// askId(res);	
			
		});
}

function viewLow(){
	connection.query("SELECT * FROM Products WHERE stock_quantity<5", function(err, res){

		table = new cliTable({
			head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		});

		for(var i=0; i<res.length; i++){
			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
		}

		console.log(table.toString());
	});

	displayOptions();
}


function addInventory(){
	inquirer.prompt([

		{
			type:"list",
			name: "addInventory",
			message: "Which item would you like to add more of in the Inventory?",
			choices: itemsArray

		}
	]).then(function(answersItem){
				console.log("You selected " + answersItem.addInventory);

				//update the items Array for the next time addInventory() is called
				inventoryItems();

				inquirer.prompt([
					{
						type: "text",
						name: "addNumber",
						message:"How much do you want to add?"
					}
				]).then(function(answersNum){

					if(!isNaN(answersNum.addNumber)){
						console.log("You picked " + answersNum.addNumber);

						addNumber(answersItem.addInventory, answersNum.addNumber);
					}
					else{
						console.log('\n');
						console.log("--------------------------------------")
						console.log(" THAT'S NOT A NUMBER. TRY AGAIN");
						console.log("--------------------------------------\n")
						addInventory();
					}
				})

		});
}


//quit the connection and end the cli
function quit(){

	console.log("Peace!")
	connection.end();
}


//Attempting to to put choises paramter as a function in addInventory()
// ______________________________________________________________________________________________

function inventoryItems(){
	connection.query("SELECT product_name FROM Products", function(err, res){	
		
		for(var i =0; i< res.length; i++){
			itemsArray.push(res[i].product_name);
		}
		
	});
}
//call this function to use it
inventoryItems();
// ______________________________________________________________________________________________


function addNumber(item, number){
	connection.query("UPDATE Products SET ? WHERE ?", 
		[
			{
				stock_quantity: number
			},

			{
				product_name: item
			}
		],
		function(error){
			if(error) throw err;

			console.log('\n');
			console.log("--------------------------------------")
			console.log(item + " has successfully updated");
			console.log("--------------------------------------\n")

			displayOptions();
		}
	);
}

