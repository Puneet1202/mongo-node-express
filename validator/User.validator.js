const { body } = require('express-validator');

exports.registerValidator = [
    body('username')
    .trim()
    .escape()
    
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({min:3, max:30}).withMessage('Name must be between 3 and 30 characters'),

    body('email')
    .exists().withMessage('Email is required')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),


    body('password')
    
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character')
    .trim()


];
