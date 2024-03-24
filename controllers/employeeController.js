const express = require('express');
const router = express.Router();

const data = {
    employee: require('../data/data.json'),
    setEmployee: function (data) { this.employee = data }
};


const getAllEmployee = (req, res) => {
    res.json(data.employee);
}

const createEmployee = (req, res) => {

    const newEmployee = {
        id: data.employee.length + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.sendStatus(400).json({ message: "Firstname and lastname are required" });
    }
    data.setEmployee([...data.employee, newEmployee]);
    res.sendStatus(201).json(data.employee);
}
const updateEmployee = (req, res) => {
    const employee = data.employee.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.sendStatus(400).json({ "messgae": `Employee Id ${req.body.id} is Not found` })
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filterArray = data.employee.filter(emp => emp.id !== parseInt(req.body.id));
    const unSortedArr = [...filterArray, employee];
    data.setEmployee(unSortedArr.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employee)
}

const deleteEmployee = (req, res) => {
    console.log("------------------------req", req.body.id);
    const employee = data.employee.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.sendStatus(400).json({ "messgae": `Employee Id ${req.body.id} is Not found` })
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filterArray = data.employee.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployee([...filterArray])
    res.json(data.employee);
}

const getEmployee = (req, res) => {
    const employee = data.employee.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.sendStatus(400).json({ "messgae": `Employee Id ${req.body.id} is Not found` })
    }
    res.json(employee);
}

module.exports = { getAllEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployee }