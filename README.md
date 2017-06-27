# Bamazon
The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

----------------------------------

Bamazon Customer View

----------------------------------

The Customer view allows the user to view the the products, as well as thier details. The is then asked to search based on a product/item ID. Lastly, they are asked to enter in how much of that product they want to buy. If the item is in the stock, the purchase will go through, the database will be updated and the user will see the cost of the purchase. 

User view of Items


![Customer View](/images/customerViewImages/table2.PNG)

Entering the ID for desired Item


![Customer View](/images/customerViewImages/EnteringID.PNG)

Entering Unit for desired Item


![Customer View](/images/customerViewImages/EnteringUnits.PNG)

Transaction completed successfull, Database Updated, Total price Shown


![Customer View](/images/customerViewImages/completedTrans.PNG)


----------------------------------

Bamazon Manager View

----------------------------------

The Bamazon Manager view allows the user to select from a list of menu options:
- View Products for sale
- View Low Inventory
- Add to Inventory
- Add New Product

- If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

- If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

- If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

- If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
***THIS HAS NOT BEEN IMPLEMENTED YET***


View Products for sale


![Manager View](/images/managerViewImages/firstOption.PNG)


-View Low Inventory


![Manager View](/images/managerViewImages/option2.PNG)


-Add New Product


![Manager View](/images/managerViewImages/option3.PNG)




----------------
To-Dos 
----------------
- write markdown file
- make output more readable and cleaner with color npm

Manager View To-Dos
- Finish add product option
- add item amount when selecting add Item option(Currently updates the item amount selected)

Supervisor View To-Do
- Implement Supervisor View
