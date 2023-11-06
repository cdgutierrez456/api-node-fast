import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  const [ rows ] = await pool.query('select * from employee')
  res.send(rows)
}

export const getEmployee = async (req, res) => {
  const { id } = req.params
  const { rows } = pool.query(`select * from employee where id = "${id}"`)
  if (!rows.length) return res.status(404).json({
    message: "Employee not found"
  })
  res.json(rows[0])
}

export const createEmployee = async (req, res) => {
  const { name, lastname, salary } = req.body
  const [ rows ] = await pool.query(`
    insert into employee (name, lastname, salary) 
    values ("${name}", "${lastname}", ${salary})
  `)
  res.send({
    id: rows.insertId,
    name,
    lastname,
    salary
  })
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params
  const { name, lastname, salary } = req.body
  const [ result ] = await pool.query(`
    update employee set 
    name = "${name}", 
    lastname = "${lastname}",
    salary = ${salary}
    where id = "${id}";
  `)
  if (!result.affectedRows) return res.status(404).json({
    message: "Employee not found"
  })
  const [ rows ] = await pool.query(`select * from employee where id = "${id}"`)
  res.json({
    message: "Employee update",
    data: rows[0]
  })
}

export const deleteEmployee = async (req, res) => {
  const { id } = req.params
  const [ result ] = await pool.query(`delete from employee where id = "${id}";`)
  if (!result.affectedRows) return res.status(404).json({
    message: "Employee not found"
  })
  res.sendStatus(204)
}