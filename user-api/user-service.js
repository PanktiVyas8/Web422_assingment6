/********************************************************************************
* WEB422 – Assignment 6
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Pankti Vyas   Student ID: 113535173   Date: August 13 2025
*
* Published URL: https://web422-assignment6-ten.vercel.app/
*
********************************************************************************/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let mongoDBConnectionString = process.env.MONGO_URL;

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  favourites: [String],
  history: [String]
});

let User;

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(mongoDBConnectionString);

    db.on('error', err => reject(err));

    db.once('open', () => {
      User = db.model('users', userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = function (userData) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userData.userName || !userData.password || !userData.password2) {
        reject("Missing required fields");
        return;
      }

      if (userData.password !== userData.password2) {
        reject("Passwords do not match");
        return;
      }

      const existingUser = await User.findOne({ userName: userData.userName });
      if (existingUser) {
        reject("Username already taken");
        return;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = new User({
        userName: userData.userName,
        password: hashedPassword,
        favourites: [],
        history: []
      });

      await newUser.save();
      resolve(`User ${userData.userName} successfully registered`);
    } catch (err) {
      reject(`There was an error registering the user: ${err}`);
    }
  });
};

module.exports.checkUser = function (userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ userName: userData.userName });
      if (!user) {
        reject(`Unable to find user ${userData.userName}`);
        return;
      }

      const passwordMatch = await bcrypt.compare(userData.password, user.password);
      if (!passwordMatch) {
        reject(`Incorrect password for user ${userData.userName}`);
        return;
      }

      resolve(user);
    } catch (err) {
      reject(`Error checking user: ${err}`);
    }
  });
};

module.exports.getFavourites = function (id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then(user => {
        if (user) resolve(user.favourites);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to get favourites for user with id: ${id}`));
  });
};

module.exports.addFavourite = function (id, favId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $addToSet: { favourites: favId } },
      { new: true }
    )
      .exec()
      .then(user => {
        if (user) resolve(user.favourites);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to update favourites for user with id: ${id}`));
  });
};

module.exports.removeFavourite = function (id, favId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $pull: { favourites: favId } },
      { new: true }
    )
      .exec()
      .then(user => {
        if (user) resolve(user.favourites);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to remove favourite for user with id: ${id}`));
  });
};

module.exports.getHistory = function (id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .exec()
      .then(user => {
        if (user) resolve(user.history);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to get history for user with id: ${id}`));
  });
};

module.exports.addHistory = function (id, historyId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $addToSet: { history: historyId } },
      { new: true }
    )
      .exec()
      .then(user => {
        if (user) resolve(user.history);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to update history for user with id: ${id}`));
  });
};

module.exports.removeHistory = function (id, historyId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $pull: { history: historyId } },
      { new: true }
    )
      .exec()
      .then(user => {
        if (user) resolve(user.history);
        else reject(`User not found`);
      })
      .catch(() => reject(`Unable to remove history for user with id: ${id}`));
  });
};
