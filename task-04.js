/*
An object is given and it simulates in the most primitive
form a layer for working with data (see in the code).
The function needs to be refactored to avoid many levels of nesting:

```
const buyBookForUser = (bookId, userId, callback) => {
    database.getUser(userId, (err, user) => {
        if (err) {
            callback(err);
        } else {
            database.getUsersBook(userId, (err, userBooks) => {
                if (err) {
                    callback(err);
                } else {
                    if (userBooks.includes(bookId)) {
                        callback(`User already has book with id=${bookId}`);
                    } else {
                        database.buyBook(bookId, (err) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, 'Success');
                            }
                        });
                    }
                }
            })
        }
    })
}
```
*/

const database = {
  getUser: (id, callback) => {
    const users = [{
      id: 1,
      name: 'Robert',
    }, {
      id: 2,
      name: 'John'
    }, {
      id: 5,
      name: 'Morgan'
    }];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    }
    else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2],
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to id=${userId} not found`);
    }
    else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [{
      id: 1,
      name: 'Art of war'
    }, {
      id: 2,
      name: 'Hunger games'
    }, {
      id: 3,
      name: '1984'
    }];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    }
    else {
      callback(null, true);
    }
  },
};

const lookupForUser = (userId) => {
  return new Promise((resolve, reject) => {
    database.getUser(userId, (err, user) => {
      if (err !== null) reject(err);
      else resolve(user);
    });
  });
};

const lookupForUsersBooks = (userId) => {
  return new Promise((resolve, reject) => {
    database.getUsersBook(userId, (err, books) => {
      if (err !== null) reject(err);
      else resolve(books);
    });
  });
};

const doesUserHaveBook = (books, bookId) => {
  return new Promise((resolve, reject) => {
    if (books && books.includes(bookId)) reject(`User already has book with id=${bookId}`);
    else resolve(bookId);
  });
};

const handleBuyBook = (bookId) => {
  return new Promise((resolve, reject) => {
    database.buyBook(bookId, (err, result) => {
      if (err !== null) reject(err);
      else resolve("Success");
    });
  });
};

const buyBookForUser = (bookId, userId, callback) => {
  lookupForUser(userId)
    .then(user => lookupForUsersBooks(user.id))
    .then(books => doesUserHaveBook(books, bookId))
    .then(bookId => handleBuyBook(bookId))
    .then(success => callback(null, success))
    .catch(err => callback(err));
}

// basic tests
buyBookForUser(1, 1, (err, message) => {
  console.log(err) // null
  console.log(message) // 'Success'
});

buyBookForUser(1, 2, (err, message) => {
  console.log(err) // 'User already has book with id=1'
  console.log(message) // undefined
});

buyBookForUser(3, 2, (err, message) => {
  console.log(err) // null
  console.log(message) // 'Success'
});

buyBookForUser(5, 2, (err, message) => {
  console.log(err) // 'Book with id=5 not found'
  console.log(message) // undefined
});

buyBookForUser(1, 3, (err, message) => {
  console.log(err) // 'User with id=3 not found'
  console.log(message) // undefined
});

buyBookForUser(1, 5, (err, message) => {
  console.log(err) // 'Set of books related to id=5 not found'
  console.log(message) // undefined
});
