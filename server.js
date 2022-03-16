require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');
const { getAllCompanies, createCompany, deleteCompany, editCompany } = require('./controller/company.controller');
const { getAllEmployees, createEmployee, deleteEmployee, editEmployee } = require('./controller/employee.controller');
const { userLogin, userRegister } = require('./controller/user.controller');
const isAuth = require('./jwt/passport-setup');

const app = express();

const Router = express.Router();

connectDB();

app.use(express.json());

// Routes for employees
Router.get('/api/employee', getAllEmployees);
Router.post('/api/employee', createEmployee);
Router.delete('/api/employee/:_id', deleteEmployee);
Router.put('/api/edit/:_id', editEmployee);

// Routes for users
Router.post('/api/register', userRegister);
Router.post('/api/login', userLogin);
Router.get('/api/current-user', isAuth(), (req, res) => {
  res.json(req.user);
});

// Routes for companies
Router.get('/api/company', getAllCompanies);
Router.post('/api/company', createCompany);
Router.delete('/api/delete/company/:_id', deleteCompany);
Router.put('/api/edit/company/:_id', editCompany);

app.use('/', Router);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.log('server connection failed') : console.log(`server connected successfully on PORT ${PORT}`);
});
