const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, 'data.json');

// Initialize data file agar pehle se na ho
if (!fs.existsSync(dataFile)) {
  const initialData = { users: [], posts: [] };
  fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
}

// Read data helper
const getData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [], posts: [] };
  }
};

// Write data helper
const saveData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const db = {
  // Get user by username
  findUserByUsername: (username, callback) => {
    const data = getData();
    const user = data.users.find(u => u.username === username);
    callback(null, user);
  },

  // Insert new user
  insertUser: (userObj, callback) => {
    const data = getData();
    const existing = data.users.find(u => u.username === userObj.username);
    if (existing) {
      return callback(new Error('Username already taken'));
    }
    const newUser = { id: Date.now(), ...userObj };
    data.users.push(newUser);
    saveData(data);
    callback(null, { lastID: newUser.id });
  },

  // Get all posts
  getAllPosts: (callback) => {
    const data = getData();
    // Latest posts upar dikhane ke liye reverse order
    const posts = [...data.posts].reverse();
    callback(null, posts);
  },

  // Insert new post
  insertPost: (postObj, callback) => {
    const data = getData();
    const newPost = { 
      id: Date.now(), 
      ...postObj, 
      created_at: new Date().toLocaleString() 
    };
    data.posts.push(newPost);
    saveData(data);
    callback(null);
  }
};

module.exports = db;
