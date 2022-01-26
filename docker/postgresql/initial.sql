Insert into "Category" (id, name, image_id)
values
    (1,'Bakery','f3fbf57b118fa9'),
    (2,'Entrees','b271afbefdc554'),
    (3,'Drinks','eba73b2361fae3');
    
Insert into "Item" ("categoryId", id, image_id, name, price)
values
    (1, 1,'293202f9d9f7f4','Bagel',2.0),
    (1,2,'808916fd5ddf96','Croissant',1.0),
    (1,3,'95d02a230fe050','Muffin',1.25),
    (1,4,'23f95765b967ff','Toast / Bread',1),
    (1,5,'5650be5d48a99b','English Muffin',2.5),
    (2,6,'bd237a0c0d19ef','Pasta Bar',12.99),
    (2,7,'3e1bd1342800f7','Mediterranean Entree',10.99),
    (2,8,'72589c4c990f97','Indian Entree',11.95),
    (3,9,'70c2a6247e7b58','Small Drink',0.75),
    (3,10,'dba0fc03da30ca','Medium Drink',1.5),
    (3,11,'ffc9bf61e441cd','Large Drink',2);

Insert into "Payment" (id, name)
values (1, 'Cash');

Insert into "Store" (id, name)
values (1, 'Main');

Insert into "Client" (id, name)
values (1, 'Only');
