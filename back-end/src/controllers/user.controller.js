const sequelize = require("../models/index");

const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");

const getUserInfo = async (req, res) => {
  let { id } = req.params;
  let entity = await models.users.findOne({
    where: {
      user_id: id,
    },
    include: [
      {
        model: models.tutor_profile,
        as: "tutor_profiles",
        include: ['tutor_certifications','tutor_educations','tutor_experiences']
      },
    ],
  });

  var student_profile = await models.student_profile.findOne({
    where:{
      student_id: id
    },
    include:[{
      model: models.student_education,
      as: "student_educations",
      include: [{
        model: models.school,
        as: 'school',
      }]
    }]
  })

  entity.dataValues.student_profile = student_profile;

  return succesCode(res, entity, "Success");
};


const updateUserInfo = async (req, res) => {
  let { id } = req.params;
  let entity = await models.users.findOne({
    where: {
      user_id: id,
    }
  });

  entity.update(req.body)

  return succesCode(res, entity, "Success");
};

module.exports = { getUserInfo , updateUserInfo};
