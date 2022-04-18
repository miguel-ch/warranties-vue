import { openDb } from "../database.js";
import { modifyQuery, searchAllFromTable, searchQuery } from "../models/database.helper.js";

class EmployeeService {
    // Get all the employees list
    static getEmployees(next) {
        searchAllFromTable("vendedores", next);
    }

    // Get an employee with its code
    static getEmployee(code, next) {
        searchQuery("SELECT * FROM vendedores WHERE codigo=?", [code], next);
    }

    // Insert a new employee
    static createEmployee(employee, next) {
        modifyQuery(
            "INSERT INTO vendedores (codigo, nombre) VALUES (?, ?);",
            [employee.code, employee.name],
            next
        );
    }

    // Update an existing employee
    static updateEmployee(employee, next) {
        modifyQuery(
            "UPDATE vendedores SET nombre=? WHERE codigo=?",
            [employee.name, employee.code],
            next
        );
    }
}

export default EmployeeService;
