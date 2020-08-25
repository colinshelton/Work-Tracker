module.exports = function(sequelize, DataTypes) {
  var Punch = sequelize.define("Punch", {
    punch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  Punch.associate = function(models) {
    // We're saying that a Punch should belong to an Author
    // A Punch can't be created without an Author due to the foreign key constraint
    Punch.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Punch;
};
