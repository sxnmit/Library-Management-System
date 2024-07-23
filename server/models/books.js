module.exports = (sequelize, DataTypes) => {

  const Books = sequelize.define("Books", {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviews: {
      type: DataTypes.INTEGER,
    }

  })


  return Books

}