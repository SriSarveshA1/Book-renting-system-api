const db=require("../models/index");
const Book=db.Book;
const Op=db.Sequelize.Op;

exports.create=(req, res, next)=>{
    const data={
        lsbn:req.body.lsbn,
        Name:req.body.name,
        Author:req.body.author,
        publishedOn:req.body.publishedOn,
        AddedOn:req.body.addedOn
    };
   
    Book.findOne({where:{lsbn:req.body.lsbn}}).then((content) => {
        
        if(!content)
        {
            
            Book.create(data).then((book)=>{
                return res.status(200).send(book);
            }).catch((err)=>{
               return res.status(500).send({message:err.message});
            })
           
        }
        else{
            return res.status(400).send("There is already a book with this lsbn so please enter valid ");
        
        }
    }).catch((err)=>{
        return res.status(500).send({message:err.message});
    });
     
    

}
exports.getList=(req, res) => {
    Book.findAll().then((books)=>{
        res.status(200).send(books)
    }).catch((err)=>{
        res.status(500).send({message:err.message});000
    })
}
exports.update=(req, res, next) =>{
    const data={
        lsbn:req.body.lsbn,
        Name:req.body.name,
        Author:req.body.author,
        publishedOn:req.body.publishedOn,
        AddedOn:req.body.addedOn
    }
    Book.update(data,{
        where:{
            lsbn:req.params.id
        },
        returning:true
    }).then(()=>{
        Book.findByPk(req.params.id).then((data)=>{
            res.status(201).send(data);
        })
    }).catch((err)=>{
        res.status(500).send({message:err.message});
    })
}

exports.isAvailRent=(req, res) => {
    Book.findByPk(req.params.id).then((book)=>{
        let value=book.isRented;
        res.status(200).send("Is Rented: " + value);
    })
}

exports.rentedByUser=(req, res) => {
    Book.findAll({where:{UserId:req.params.id}}).then((books)=>{
        res.status(200).send(books);
    })
}

exports.mutate=(req, res) => {
    let del=req.query.delete;
    let rent=req.query.rented;
    let ret=req.query.return;
    let promise=null;
    if(del){
       //deleting (the id of the book will be passed in the req body)
       promise=Book.destroy({where: {lsbn:req.body.lsbn}}).then(()=>{
           res.status(200).send("Deleted Successfully");
       })
    }
    if(rent){
       //renting the service
       const data={
           isRented:"Yes",
           UserId:req.UserId
       }
       //user should not be able to rent more than 2 books at a time
       if(req.body.ids.length > 2)
       {
        res.status(400).send("You cant rent more than 2 books at a time");
       }
       promise=Book.update(data,{where:{lsbn:{[Op.or]:req.body.ids}},returning:true}).then(()=>{
           Book.findAll({where:{lsbn:{[Op.or]:req.body.ids}}}).then((books)=>{
               res.status(200).send(books);
           })
       })
    }
    if(ret){
       //returning the service
       const data={
           isRented:"No",
           UserId:null
       }
       promise=Book.update(data,{where:{lsbn:{[Op.or]:req.body.ids}},returning:true}).then(()=>{
        Book.findAll({where:{lsbn:{[Op.or]:req.body.ids}}}).then((books)=>{
            res.status(200).send(books);
        })
       })
    }
    promise.catch((err)=>{
        res.status(500).send({message:err.message});
    })
}