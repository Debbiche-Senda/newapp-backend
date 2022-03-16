const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.json(newCompany);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Register failed' });
  }
};

exports.getAllCompanies = async (req, res) => {
  const companies = await Company.find();

  try {
    res.json(companies);
  } catch (error) {
    console.log('get companies failed', error);
    res.status(500).json({ msg: 'Fetch companies failed' });
  }
};

exports.deleteCompany = async (req, res) => {
  const { _id } = req.params;
  try {
    await Company.findByIdAndDelete({ _id });
    res.status(200).json({ msg: 'Company deleted with success' });
  } catch (error) {
    console.error('Company delete failed', error);
    res.status(500).json({ msg: 'Company delete failed' });
  }
};

exports.editCompany = async (req, res) => {
  const { _id } = req.params;

  try {
    const company = await Company.findById(_id);
    console.log(_id);
    console.log(company);
    company.set(req.body);
    await company.save();
    res.json(company);
  } catch (error) {
    console.log('Company update failed', error);
    res.status(500).json({ msg: 'Company update failed' });
  }
};
