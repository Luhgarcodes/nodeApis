const express = require('express');
const router = express.Router();
const employeeDta = require('../../controllers/employeeController')
const data = {};
data.employee = require('../../data/data.json');
const rolesList = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(employeeDta.getAllEmployee)
    .post(verifyRoles(rolesList.Admin, rolesList.Editor), employeeDta.createEmployee)
    .put(verifyRoles(rolesList.Admin, rolesList.Editor), employeeDta.updateEmployee)
    .delete(verifyRoles(rolesList.Admin), employeeDta.deleteEmployee)

router.route('/:id').get(employeeDta.getEmployee)

module.exports = router;