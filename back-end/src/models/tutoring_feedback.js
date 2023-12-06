const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tutoring_feedback.init(sequelize, DataTypes);
}

class tutoring_feedback extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tutoring_feedback_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    },
    message: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ratting: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutoring_feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tutoring_feedback_id" },
        ]
      },
      {
        name: "course_id",
        using: "BTREE",
        fields: [
          { name: "course_id" },
        ]
      },
    ]
  });
  }
}
