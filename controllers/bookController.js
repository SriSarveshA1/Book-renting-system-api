const db=require("../models/index");
const Book=db.Book;

exports.create=(req, res, next)=>{
    const data={
        lsbn:req.body.lsbn,
        Name:req.body.name,
        Author:req.body.author,
        publishedOn:req.body.publishedOn,
        AddedOn:req.body.addedOn
    };
    Book.create(data).then((book)=>{
        res.status(201).send(book);
    }).catch((err)=>{
        res.status(500).send({message:err.message});
    })

}
exports.getList=(req, res) => {
    Book.findAll().then((books)=>{
        res.status(200).send(books)
    }).catch((err)=>{
        res.status(500).send({message:err.message});000
    })
}