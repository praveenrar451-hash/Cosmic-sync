// In-Memory Database for Render Stability
let users = [];
let posts = [];

const db = {
  // Get user by username
  findUserByUsername: (username, callback) => {
    const user = users.find(u => u.username === username);
    callback(null, user);
  },

  // Insert new user
  insertUser: (userObj, callback) => {
    const existing = users.find(u => u.username === userObj.username);
    if (existing) {
      return callback(new Error('Username already taken'));
    }
    const newUser = { id: Date.now(), ...userObj };
    users.push(newUser);
    callback(null, { lastID: newUser.id });
  },

  // Get all posts
  getAllPosts: (callback) => {
    const sortedPosts = [...posts].reverse();
    callback(null, sortedPosts);
  },

  // Insert new post
  insertPost: (postObj, callback) => {
    const newPost = { 
      id: Date.now(), 
      ...postObj, 
      created_at: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() 
    };
    posts.push(newPost);
    callback(null);
  }
};

module.exports = db;
