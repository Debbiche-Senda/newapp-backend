const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Register failed' });
  }
};

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  try {
    res.json(employees);
  } catch (error) {
    console.log('get employees failed', error);
    res.status(500).json({ msg: 'Fetch employees failed' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { _id } = req.params;
  try {
    await Employee.findByIdAndDelete({ _id });
    res.status(200).json({ msg: 'Employee deleted with success' });
  } catch (error) {
    console.error('Employee delete failed', error);
    res.status(500).json({ msg: 'Employee delete failed' });
  }
};

exports.editEmployee = async (req, res) => {
  const { _id } = req.params;

  try {
    const employee = await Employee.findById(_id);
    console.log(req.body);
    employee.set(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.log('Employee update failed', error);
    res.status(500).json({ msg: 'Employee update failed' });
  }
};
