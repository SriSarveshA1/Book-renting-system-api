module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Book=sequelize.define("Book",{
        lsbn:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        Name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Author:{
            type:DataTypes.STRING,
            allowNull:false
        },
        publishedOn:{
            type:DataTypes.DATE
            
        },
        AddedOn:{
            type:DataTypes.DATE,
            defaultValue:Date.now
        },
        isRented:{
            type:DataTypes.STRING,
            defaultValue:"No"
        }

    })
    return Book;

};