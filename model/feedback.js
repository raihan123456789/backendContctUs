function feedbackModel(sequelize, Sequelize) {
    const Feedback = sequelize.define(
      "feedback",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: true,
        }
      },
      {
        freezeTableName: true,
      }
    );
  
    return Feedback;
  }
  
  module.exports = {
    feedbackModel: feedbackModel,
  };