import { Router } from "express";
import { getEmployee, getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router()

router.get('/employees', getEmployees)

router.get('/employee/:id', getEmployee)

router.post('/employees', createEmployee)

router.put('/employees', updateEmployee)

router.delete('/employees/:id', deleteEmployee)

export default router;

