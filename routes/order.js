const express = require('express');
const { body } = require('express-validator');

const orderController = require('../controllers/order');
const { isAuth } = require('../middlewares/is-auth');
const upload = require('../utils/multer');

const router = express.Router();

//──── GET Http Methods ──────────────────────────────────────────────────────────────────
// GET /api/orders
router.get('/order', orderController.getOrders);

// GET /api/order/:orderId
router.get('/order/:orderId', orderController.getOrder);
//──── GET Http Methods ──────────────────────────────────────────────────────────────────


//──── POST Http Methods ─────────────────────────────────────────────────────────────────
// POST /api/order
router.post(
    '/order',
    //upload.single('imageUrl'),
    [
        body('status')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('type')
            .trim()
            .not()
            .isEmpty(),
        body('province')
            .trim()
            .not()
            .isEmpty(),
        body('city')
            .trim()
            .not()
            .isEmpty(),
        body('district')
            .trim()
            .not()
            .isEmpty(),
        body('street')
            .trim()
            .not()
            .isEmpty(),
        body('priority')
            .trim()
            .not()
            .isEmpty(),
        body('startDate')
            .trim()
            .not()
            .isEmpty(),
        body('project')
            .trim()
            .not()
            .isEmpty(),
        body('period')
            .trim()
            .not()
            .isEmpty(),
        body('dueDate')
            .trim()
            .not()
            .isEmpty(),
    ],
    orderController.createOrder
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────



//──── PUT Http Methods ──────────────────────────────────────────────────────────────────
// PUT /api/order/:orderId
router.put(
    '/order/:orderId',
    isAuth,
    //upload.single('imageUrl'),
    [
        body('status')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('status')
            .trim()
            .not()
            .isEmpty(),
        body('province')
            .trim()
            .not()
            .isEmpty(),
        body('city')
            .trim()
            .not()
            .isEmpty(),
        body('district')
            .trim()
            .not()
            .isEmpty(),
        body('street')
            .trim()
            .not()
            .isEmpty(),
        body('priority')
            .trim()
            .not()
            .isEmpty(),
        body('startDate')
            .trim()
            .not()
            .isEmpty(),
        body('project')
            .trim()
            .not()
            .isEmpty(),
        body('period')
            .trim()
            .not()
            .isEmpty(),
        body('dueDate')
            .trim()
            .not()
            .isEmpty(),
    ],
    orderController.updateOrder
);
//──── PUT Http Methods ──────────────────────────────────────────────────────────────────

//──── DELETE Http Methods ───────────────────────────────────────────────────────────────
// DELETE /api/order/:orderId
router.delete('/order/:orderId', isAuth, orderController.deleteOrder);
//──── DELETE Http Methods ───────────────────────────────────────────────────────────────

module.exports = router;
