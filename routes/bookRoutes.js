const bookController=require("../controllers/bookController");
const authJwt=require("../middlewares/index").authJwt
module.exports=(app)=>{
    app.post("/books/",[authJwt.verifyToken],bookController.mutate);
    app.post("/books/create",[authJwt.verifyToken],bookController.create);
    app.get("/books/list",[authJwt.verifyToken],bookController.getList);
    app.put("/books/update/:id",[authJwt.verifyToken],bookController.update);
    app.get("/books/isAvail/:id",[authJwt.verifyToken],bookController.isAvailRent);
    app.get("/books/rented/:id",[authJwt.verifyToken],bookController.rentedByUser);
   
}