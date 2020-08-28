const homeController = require('../app/http/controlers/homeController')
const authController = require('../app/http/controlers/authController')
const cartController = require('../app/http/controlers/customers/cartController')

function initRoutes(app) {

    //app.get('/', (req,res) => {
    //    res.render('home')
    //})

    app.get('/',homeController().index)
    app.get('/login', authController().login)
    app.get('/register', authController().register)

    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
}

module.exports = initRoutes