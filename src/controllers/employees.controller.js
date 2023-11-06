import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [ rows ] = await pool.query('select * from employee')
    res.send(rows)
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = pool.query(`select * from employee where id = "${id}"`)
    if (!rows.length) return res.status(404).json({
      message: "Employee not found"
    })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const createEmployee = async (req, res) => {
  const { name, lastname, salary } = req.body
  try {
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
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params
  const { name, lastname, salary } = req.body
  try {
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
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const deleteEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const [ result ] = await pool.query(`delete from employee where id = "${id}";`)
    if (!result.affectedRows) return res.status(404).json({
      message: "Employee not found"
    })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}