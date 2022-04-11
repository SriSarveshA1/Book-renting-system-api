const bookController=require("../controllers/bookController");
module.exports=(app)=>{
    app.post("/books/create",bookController.create);
    app.get("/books/list",bookController.getList);
}