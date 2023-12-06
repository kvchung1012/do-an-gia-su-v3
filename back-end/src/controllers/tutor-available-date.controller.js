const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.tutor_available_date.findAll({
    include: ["schedule"],
  });
  return succesCode(res, entities, "Lấy danh sách thành công!!!");
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.tutor_available_date.findByPk(id, {
    include: ["schedule"],
  });
  return succesCode(res, entity);
};

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.tutorintutor_available_dateg_feedback.create({
    tutor_available_date_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.tutor_available_date.findByPk(id);
  if (!model) {
    return failCode(res, "model is not exists");
  }

  model.update(body);
  await model.save();

  model.reload();
  return succesCode(res, model);
};

const deleteById = async (req, res) => {
  let { id } = req.params;
  let result = await models.tutor_available_date.destroy({
    where: {
      tutor_available_date_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

module.exports = { findAll, findById, create, update, deleteById };
