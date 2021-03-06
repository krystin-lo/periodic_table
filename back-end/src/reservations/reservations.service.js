const knex = require("../db/connection");

const tableName = "reservations";

function edit(reservation_id, reservation) {
    return knex(tableName)
      .where({ reservation_id: reservation_id })
      .update({ ...reservation })
      .returning("*");
}

function create(reservation) {
  return knex(tableName).insert(reservation).returning("*");
}

function read(reservation_id) {
    return knex(tableName)
      .select("*")
      .where({ reservation_id: reservation_id })
      .first();
}

function list(date, mobile_number) {
  if (date) {
    return knex(tableName)
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time", "asc");
  }

  if (mobile_number) {
    return knex(tableName)
      .select("*")
      .where("mobile_number", "like", `${mobile_number}%`);
  }

  return knex(tableName).select("*");
}

function update(reservation_id, status) {
  return knex(tableName)
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}



module.exports = {
  list,
  create,
  read,
  update,
  edit,
};