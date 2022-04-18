import EmployeeService from "../services/employees.service.js";

export const getAllEmployees = (req, res) => {
    EmployeeService.getEmployees((err, emp) => {
        // Error
        if (err) return res.status(err.statusCode).json(err.message);

        // Returns the info
        res.status(200).json(emp);
    });
};

export const getEmployee = (req, res) => {
    // Code check
    let { code } = req.params;
    if (!code) return res.status(400).json({ message: "No code given" });

    EmployeeService.getEmployee(code, (err, employee) => {
        // Error
        if (err) return res.status(err.statusCode).json(err.message);

        // Returns the info
        if (!employee)
            return res.status(404).json({ message: "No employee found" });
        res.status(200).json(employee);
    });
};

export const createEmployee = (req, res) => {
    //Info check
    let { code, name } = req.body;
    if (!code || !name)
        return res.status(400).json({ message: "Incomplete information" });

    // Calls the service
    EmployeeService.createEmployee({ code, name }, (err, data) => {
        // Error
        if (err)
            return res.status(err.statusCode).json({ message: err.message });

        // Returns the info

        if(data.changes <= 0) return res.status(400).json({message: 'No information created'});
        res.status(201).json({ message: "Created successfully" });
    });
};

export const updateEmployee = (req, res) => {
    //Info check
    let { code } = req.params;
    let { name } = req.body;
    if (!code || !name)
        return res.status(400).json({ message: "Incomplete information" });

    // Calls the service
    EmployeeService.updateEmployee({ code, name }, (err, data) => {
        // Error
        if (err) return res.status(err.statusCode).json(err.message);

        if(data.changes <= 0) return res.status(400).json({message: 'No information updated'});
        res.status(202).json({ message: "Updated successfully" });
    });
};
