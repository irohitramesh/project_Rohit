// Design an Express backend for Instagram-like posts

// Initialize Express and Mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

// Create a schema for posts
const postSchema = mongoose.Schema({
    image: String,
    caption: String,
    comments: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    }
});

// Create a model for posts
const Post = mongoose.model('Post', postSchema);

// Create a route for getting all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.send(posts);
});

// Create a route for getting a single post
app.get('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(post);
});

// Create a route for creating a post
app.post('/posts', async (req, res) => {
    const { image, caption } = req.body;

    const newPost = new Post({
        image: image,
        caption: caption
    });

    await newPost.save();

    res.send(newPost);
});

// Create a route for updating a post
app.patch('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const caption = req.body.caption;

    const post = await Post.findById(id);

    post.caption = caption;

    await post.save();

    res.send(post);
});

// Create a route for deleting a post
app.delete('/post/:id', async (req, res) => {
    const id = req.params.id;

    await Post.findByIdAndDelete(id);
    res.send('Post deleted');
});

// Create a route for liking a post
app.put('/post/:id/like', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    post.likes = post.likes + 1;
    await post.save();
    res.send(post);
});

// Create a route for unliking a post
app.put('/post/:id/unlike', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    post.likes = post.likes - 1;
    await post.save();
    res.send(post);
});

// Create a route for commenting on a post
app.put('/post/:id/comment', async (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.send(post);
});

// Create a route for getting all comments on a post
app.get('/post/:id/comments', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(post.comments);
});

// Create a route for getting all likes on a post
app.get('/post/:id/likes', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.send(number (post.likes) );
});

// Listen on port 3000, start the server, and connect to the database
app.listen(3000, () => {
    console.log('Server started on port 3000');
    mongoose.connect("mongodb+srv://Rohit:@cluster0.cakc1bn.mongodb.net/", { .then(() => {
            console.log("Connected to the database!");
        })
        .catch((error) => {
            console.error("Error connecting to the database: " + error);
        })
});
});