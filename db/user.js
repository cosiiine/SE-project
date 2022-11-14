import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    'db.testDb',
); // returns Database object


export function createUserTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users" +
            "("+
            "key INTEGER PRIMARY KEY AUTOINCREMENT," + 
            "account TEXT NOT NULL,"+
            "name TEXT NOT NULL," +
            "password TEXT NOT NULL"+
            ");",
            [],
            (tx, results) => {
                console.log("create user table success");
            },
            (tx, results) => {
                console.log('error create');
                console.log(results);
            }
        )
    });
    db.transaction((tx) => { // if no captain exist, create a captain account
        tx.executeSql(
            "SELECT * FROM users WHERE account='captain'",
            [],
            (tx, results) => {
                if (results.rows.length == 0) {
                    console.log('init captain');
                    insertUser('captain', 'captain', 'captain');
                }
            },
            (tx, results) => {
                console.log("error finding captain");
            }
        )
    });
};

export function deleteAllUsers () {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM users",
            [],
            (tx, results) => {
                console.log("delete success");
            },
            (tx, results) => {
                console.log('delete error');
                console.log(results);
            }
        )
    });
};

export function insertUser (account, name, password) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO users (account,name,password)"+
                "VALUES (?,?,?)",
                [account, name, password],
                (_, results) => {
                    resolve(results);
                },
                (tx, results) => {
                    reject();
                }
            )
        });
    });
    
};

export function editUser (account, password) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "UPDATE users SET password=? WHERE account=?",
                [password,account],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject();
                });
        });
      });
};

export function deleteUser (account) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "DELETE FROM users WHERE account=?",
                [account],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject();
                });
        });
      });
};

export function getAllUsers () { // except captain
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM users WHERE account!=?",
                ['captain'],
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
      });
};

export function getUser (account, password) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM users WHERE account=? and password=?",
                [account, password],
                (_, results) => {
                    if(results.rows.length == 1) {
                        resolve(results.rows.item(0));
                    }else {
                        reject();
                    }
                },
                () => {
                    reject();
                });
        });
      });
};