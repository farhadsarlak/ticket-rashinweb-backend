const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/user');

//──── POST Http Methods ─────────────────────────────────────────────────────────────────
//POST /api/register
router.post(
    '/register',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email is not valid.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('Email address already exist');
                    }
                });
            }),
        body('fullname')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty()
            .withMessage('fullname is required.'),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty()
            .withMessage('password is required.')
    ],
    userController.registerUser
);

// POST /api/login
router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email is not valid.')
            .not()
            .isEmpty(),
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required.')
    ],
    userController.loginUser
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────

//GET /api/users
// GET /api/users
router.get('/users', userController.getUsers);


// GET /api/user/:userId
router.get('/user/:userId', userController.getUser);
//──── GET Http Methods ──────────────────────────────────────────────────────────────────



// //──── PUT Http Methods ──────────────────────────────────────────────────────────────────
// // PUT /api/user/:userId
// router.put(
//     '/user/:userId',
//     isAuth,
//     [
//         body('email')
//             .isEmail()
//             .normalizeEmail()
//             .withMessage('Email is not valid.')
//             .custom((value, { req }) => {
//                 return User.findOne({ email: value }).then(user => {
//                     if (user) {
//                         return Promise.reject('Email address already exist');
//                     }
//                 });
//             }),
//         body('fullname')
//             .trim()
//             .isLength({ min: 5 })
//             .not()
//             .isEmpty()
//             .withMessage('fullname is required.'),
//         body('password')
//             .trim()
//             .isLength({ min: 5 })
//             .not()
//             .isEmpty()
//             .withMessage('password is required.')
//     ],
//     userController.updateUser
// );
// //──── PUT Http Methods ──────────────────────────────────────────────────────────────────

// //──── DELETE Http Methods ───────────────────────────────────────────────────────────────
// // DELETE /api/user/:userId
// router.delete('/user/:userId', isAuth, userController.deleteUser);
// //──── DELETE Http Methods ───────────────────────────────────────────────────────────────

module.exports = router;
