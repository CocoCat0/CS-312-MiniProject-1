//INITAILIZING NEEDED MODULES: EXPRESS, FILE PATH, BODYPARSER, EJS, AND DECLARING VARIABLES

//Setting up the express module
import express from "express";
const port = 3000;
const app = express();

//Setting up file path module
import { fileURLToPath } from "url";
import path, { dirname } from "path"; 
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware setup
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));

//EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Storage variable for blog posts
let posts = [];



//SETTING UP PAGE ROUTES THROUGH GET METHODS

//routing to tehe default page, ie 
app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

//routing to a create post page, ie createPost
app.post('/createPost', (req, res) => {
    const { name, title, content } = req.body;
    const time = new Date().toLocaleString();
    posts.push({ name, title, content, time });
    res.redirect('/');
});

//routing to a edit post page ie editPost
app.get('/editPost/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts[postId];
    if (post) {
        res.render('editPost.ejs', { post: post, id: postId });
    }
    else {
        res.redirect('/');
    }
});

//updating Post through a updatePost page
app.post('/updatePost/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    posts[postId] = { ...posts[postId], title, content };
    res.redirect('/');
});

//Deleting the selected post page
app.get('/deletePost/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10); 
    const post = posts[postId];
    if (post) {
        res.render('deletePost.ejs', { post: post, id: postId });
    }
    else {
        res.redirect('/');
    }
});

// Deleting the post
app.post('/deletePost/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    posts.splice(postId, 1); 
    res.redirect('/');
});




//SERVER

//initializing server and starting it up for "listening"
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
