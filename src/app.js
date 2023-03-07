const express = require('express');
// const apiRoutes = require('./Routes');
const loginController = require('./controllers/login');
const userController = require('./controllers/user.controller');
const categoriesController = require('./controllers/categories');
const postController = require('./controllers/Post.controller');
const { validateDisplayName,
  validateEmail, validatePassword } = require('./Middlewares/userValidations'); 
const validateToken = require('./Middlewares/tokenValidation');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController);

app.post('/user',
 validateDisplayName, validateEmail, validatePassword, userController.createNewUser);
app.get('/user', validateToken, userController.getAllUsers);
app.get('/user/:id', validateToken, userController.getUserById);

app.post('/categories', validateToken, categoriesController.createCategories);
app.get('/categories', validateToken, categoriesController.getAllCat);

app.post('/post', validateToken, postController.insertPostWithCategory);
app.get('/post', validateToken, postController.getAllPosts);
app.get('/post/:id', validateToken, postController.getPostById);
// app.use('/login', apiRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
