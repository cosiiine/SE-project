import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    'db.user',
); // returns Database object


export function createUserTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users" +
            "("+
            "key INTEGER PRIMARY KEY AUTOINCREMENT," +
            "isCaptain INTEGER NOT NULL,"+ 
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
            "SELECT * FROM users WHERE isCaptain=?",
            [1],
            (tx, results) => {
                if (results.rows.length == 0) {
                    console.log('init captain');
                    insertUser(1,'captain', 'captain', 'captain');
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
            "DELETE FROM users",
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

export function insertUser (isCaptain, account, name, password) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO users (isCaptain,account,name,password)"+
                "VALUES (?,?,?,?)",
                [isCaptain,account, name, password],
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
                "SELECT * FROM users WHERE isCaptain!=?",
                [1],
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