const Product = require('../models/Product');
const User = require("../models/User");
const Cart = require("../models/Cart");
const Comment = require("../models/Comment");
const passport = require('passport');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const toID = mongoose.Types.ObjectId
const { post } = require('../routes');
const { response } = require('express');
const e = require('express');

require('dotenv').config({ path: '.env' });
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true,
                maxlength: 100
            },
            price: {
                type: String,
                maxlength: 20,
                trim: true,
                required: true
            },
            quantity: {
                type: Number,
                trim: true,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                default: 1
            },
        }
    ],
});

module.exports = mongoose.model('Cart', cartSchema);const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true,
                maxlength: 100
            },
            price: {
                type: String,
                maxlength: 20,
                trim: true,
                required: true
            },
            quantity: {
                type: Number,
                trim: true,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                default: 1
            },
        }
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60
    },
    productID: {
        type: String,
        trim: true,
        required: true
    },
    productTitle: {
        type: String,
        trim: true,
        required: true
    },
    commentBody: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', commentSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10000
    },
    price: {
        type: String,
        maxlength: 20,
        trim: true,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        required: true
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
});

module.exports = mongoose.model('Product', productSchema);
const router = require('express').Router();
const appController = require('../controllers/appController');


router.get('/', (req, res) => {
    res.redirect('/home')
});


router.get('/register',
    appController.forwardAuthenticated, (req, res) => {
        res.render('register')
    });

router.get('/login',
    appController.forwardAuthenticated, (req, res) => {
        res.render('login')
    });

router.get('/home',
    appController.getAllProducts
);

router.get('/product/:id',
    appController.getProduct
);

router.get('/logout',
    appController.logout
);

router.get(
    "/create",
    appController.ensureAuthenticated,
    appController.ensureSeller, (req, res) => {
        res.render('create', {
            styles: ['simple-sidebar'],
            libs: ['sidebar', 'create'],
            user: req.user
        })
    });


router.get(
    '/cart/:productID/:quantity',
    appController.ensureAuthenticated,
    appController.addToCart
);

router.get(
    '/cart',
    appController.ensureAuthenticated,
    appController.getCart
);

router.post(
    '/register',
    appController.register
);

router.post(
    "/login",
    appController.login
);

router.post(
    '/create',
    appController.ensureAuthenticated,
    appController.ensureSeller,
    appController.listProducts
);
module.exports = router;
function increment() {
    quantity = document.getElementById('quantity_input');
    if (quantity.value < 9) {
        quantity.setAttribute("value", quantity.value++);
    }

}
function decrement() {
    quantity = document.getElementById('quantity_input');
    if (quantity.value > 1) {
        quantity.setAttribute("value", quantity.value--);
    }
}


function linkUpdater() {
    quantity = document.getElementById('quantity_input').value;
    productID = document.getElementById('productID').value;
    document.getElementById("addCartLink").href = "/cart/" + productID + "/" + quantity;
}inymce.init({
    selector: '#description'
});
$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
const Product = require('../models/Product');
const User = require("../models/User");
const Cart = require("../models/Cart");
const Comment = require("../models/Comment");
const passport = require('passport');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const toID = mongoose.Types.ObjectId
const { post } = require('../routes');
const { response } = require('express');
const e = require('express');

require('dotenv').config({ path: '.env' });













exports.register = (req, res) => {

    console.log(req.body);
    const {
        name,
        gender,
        accType,
        phoneNum,
        email,
        password,
        confirm_password,
    } = req.body;
    let errors = [];

    User.findOne({ email: email }).then(user => {
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
                errors,
                email
            });
        } else {
            const newUser = new User({
                name,
                gender,
                accType,
                phoneNum,
                email,
                password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    })
};


exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
};

exports.getAllProducts = async (req, res) => {
    const products = await Product.find({})
        .limit(100)
        .sort({ createdAt: -1 });
    if (req.user != undefined) {
        const cart = await Cart.findOne({ userID: req.user.id });
        if (cart != null) {
            res.render('home', {
                title: "Home",
                small: "For All Types Of Products",
                styles: ['simple-sidebar'],
                products: products,
                cartItems: cart.orderItems,
                libs: ['sidebar'],
                user: req.user
            })
        } else {
            res.render('home', {
                title: "Home",
                small: "For All Types Of Products",
                styles: ['simple-sidebar'],
                products: products,
                libs: ['sidebar'],
                user: req.user
            })
        }
    } else {
        res.render('home', {
            title: "Home",
            small: "For All Types Of Products",
            styles: ['simple-sidebar'],
            products: products,
            libs: ['sidebar'],
            user: req.user
        })
    }
};





exports.getProduct = async (req, res,) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        const cart = await Cart.findOne({ userID: req.user.id });
        if (cart != null) {
            res.render('product', {
                styles: ['simple-sidebar', 'product'],
                product: product,
                libs: ['sidebar', 'product'],
                user: req.user,
                cartItems: cart.orderItems
            })
        } else {
            res.render('product', {
                styles: ['simple-sidebar', 'product'],
                product: product,
                libs: ['sidebar', 'product'],
                user: req.user
            })
        }
    } catch (error) {
        console.log(error);
        req.flash(
            'error_msg',
            'The product doesn\'t exist'
        );
        res.redirect('/home');
    }
};

exports.listProducts = async (req, res) => {

    const {
        name,
        description,
        category,
    } = req.body;

    const price = Number(req.body.price);
    const sellerID = toID(req.user.id);
    const newProduct = new Product({
        name,
        description,
        price,
        category,
        sellerID
    });

    newProduct.save()
        .then(products => {
            req.flash(
                'success_msg',
                'The product has been listed successfully'
            );
            res.redirect('/home');
        })
        .catch(err => console.log(err));
};

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
};

exports.forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/home');
};

exports.ensureSeller = async (req, res, next) => {

    if (req.user.accType == 'seller') {
        return next();
    }
    req.flash('error_msg', 'You need a seller account to access this section');
    res.redirect('/home');
};
exports.addToCart = async (req, res) => {
    const productID = toID(req.params.productID);
    const quantity = Number(req.params.quantity);
    const userID = toID(req.user.id);
    const product = await Product.findById(productID);
    console.log(product);
    const name = product.name;
    const price = product.price;
    const cart = await Cart.findOne({ userID: userID });

    if (cart) {
        if (cart.orderItems.some(item => item.productID.toString().includes(productID))) {
            const pos = cart.orderItems.map(item => { return item.productID.toString() }).indexOf(productID);
            cart.orderItems[pos].quantity += quantity;
            Cart.findByIdAndUpdate(cart._id,
                {
                    $set: {
                        orderItems: cart.orderItems
                    }
                })
                .catch(err => console.log(err));
        } else {

            cart.orderItems.push({ productID, name, price, quantity });

            Cart.findByIdAndUpdate(cart._id,
                {
                    $set: {
                        orderItems: cart.orderItems
                    }
                })
                .catch(err => console.log(err));

        }

    } else {
        const newCart = new Cart({
            userID,
            orderItems: [{
                productID,
                name,
                price,
                quantity
            }],
        });
        await newCart.save()
            .catch(err => console.log(err));
        req.flash(
            'success_msg',
            'The item was added to cart successfully'
        );
        res.redirect('/product/' + productID);
    };

    exports.getCart = async (req, res) => {

        const userID = toID(req.user.id);
        const cart = await Cart.findOne({ userID: userID }).catch(err => console.log(err));
        if (cart) {
            res.render('cart', {
                styles: ['simple-sidebar'],
                cartItems: cart.orderItems,
                libs: ['sidebar'],
                user: req.user
            })
        } else {
            res.render('cart', {
                styles: ['simple-sidebar'],
                libs: ['sidebar'],
                user: req.user
            })
        }
    }
}