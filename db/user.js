import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    'db.test',
); // returns Database object

export const USERTYPE = {
    SAILOR : 0,
    CAPTAIN : 1
};


export function createUserTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users" +
            "("+
            "key INTEGER PRIMARY KEY AUTOINCREMENT," +
            "userType INTEGER NOT NULL,"+ 
            "account TEXT NOT NULL,"+
            "name TEXT NOT NULL," +
            "password TEXT NOT NULL"+
            ");",
            [],
            (tx, results) => {
                console.log("create user table | success");
            },
            (tx, results) => {
                console.log('create user table | error');
                console.log(results);
            }
        )
    });
    db.transaction((tx) => { // if no captain exist, create a captain account
        tx.executeSql(
            "SELECT * FROM users WHERE userType=?;",
            [USERTYPE.CAPTAIN],
            (tx, results) => {
                if (results.rows.length == 0) {
                    console.log('init captain');
                    insertUser(USERTYPE.CAPTAIN,'captain', 'captain', 'captain');
                }
            },
            (tx, results) => {
                console.log("finding captain | error");
            }
        )
    });
};

export function deleteAllUsers () {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM users;",
            [],
            (tx, results) => {
                console.log("delete all | success");
            },
            (tx, results) => {
                console.log('delete all | error');
                console.log(results);
            }
        )
    });
};

export function insertUser (userType, account, name, password) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO users (userType,account,name,password)"+
                "VALUES (?,?,?,?);",
                [userType, account, name, password],
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
                "UPDATE users SET password=? WHERE account=?;",
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

export function deleteUser (key) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "DELETE FROM users WHERE key=?;",
                [key],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject(results);
                });
        });
      });
};

export function getAllUsers () { // get all sailor except captain
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM users WHERE userType=?;",
                [USERTYPE.SAILOR],
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
      });
};

export function getUser (account) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM users WHERE account=?;",
                [account],
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