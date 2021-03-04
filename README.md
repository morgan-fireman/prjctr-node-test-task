# prjctr-node-test-task
Hey! If you are here, then you want to learn more about Node.js by joining the Projector training. There are only a couple of steps left for this, and one of them is a JS test task. It is necessary so that the training is of the highest quality for everyone - for you, for other students and for the teacher. After all, if you do not know the basics of JS, it will be very difficult for you. Tasks are not difficult, their completion with the proper level of dexterity takes no more than 1 hour. Good luck!

## Task 1
Implement a pure JS function `groupBy` that will group an array by a specific function passed as the second argument:
```
const groupBy = (array, func) => {
   ...
}

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)) // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
```
## Task 2
Implement the `invert` function, which will change the keys and values of objects in places:
```
const invert = (obj) => {
   ...
}

console.log(invert({ 'a': 'some', 'b': 'object', 'c': 1 })) // { 'some': 'a', 'object': 'b', '1': 'c' }
```
## Task 3
Implement the `checkParentheses` function that checks the sequence of parentheses ((), {}, and []) for syntactic correctness. The function returns `false` if the passed string contains an invalid sequence:
```
const checkParentheses = (str) => {
   ...
}

console.log(checkParentheses('--()--')) // true
console.log(checkParentheses('-a]--[')) // false
console.log(checkParentheses('dsa{vsfs{ad')) // false
console.log(checkParentheses('j78(g5b]uyg')) // false
console.log(checkParentheses(',m{i987y}hj')) // true
console.log(checkParentheses('dsa[3ed---:]::')) // true
```
## Task 4
An object is given and it simulates in the most primitive form a layer for working with data:
```
const database = {
    getUser: (id, callback) => {
        const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];
        
        const user = users.find((user) => user.id === id);
        if (!user) {
            callback(`User with id=${id} not found`);
        } else {
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
            callback(`Set of books related to userId=${userId} not found`);
        } else {
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
        } else {
            callback(null, true);
        }
    },
};
```
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
Use this code to test your changes:
```
buyBookForUser(1,1, (err, message) => {
    console.log(err) // null
    console.log(message) // 'Success'
})

buyBookForUser(1,2, (err, message) => {
    console.log(err) // 'User already has book with id=1'
    console.log(message) // undefined
})

buyBookForUser(3,2, (err, message) => {
    console.log(err) // null
    console.log(message) // 'Success'
})

buyBookForUser(5,2, (err, message) => {
    console.log(err) // 'Book with id=5 not found'
    console.log(message) // undefined
})

buyBookForUser(1,3, (err, message) => {
    console.log(err) // 'User with id=3 not found'
    console.log(message) // undefined
})
```

The result of executing this test should be an open repository with at least 4 files (one task - one file).
Add a link to your repository here:
https://forms.gle/gvXFZ3Ay65FUsP4J8
