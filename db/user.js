import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    'db.test',
); // returns Database object

export const USERTYPE = {
    SAILOR : 0,
    CAPTAIN : 1
};


export function createUserTable () {
    new Promise((resolve, reject) => {
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
                    resolve(results);
                },
                (tx, results) => {
                    
                    reject(results);
                }
            )
        });
    }).then((ret)=>{
        console.log("create user table | success");
        // console.log(results);

        new Promise((resolve, reject) => { // check if captain exist
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM users WHERE userType=?;",
                    [USERTYPE.CAPTAIN],
                    (tx, results) => {
                        resolve(results);
                    },
                    (tx, results) => {
                        reject(results);
                    }
                )
            });
        }).then((results)=>{
            if (results.rows.length == 0){ // no captain , create one
                insertUser(USERTYPE.CAPTAIN,'captain', 'captain', 'captain').then((ret)=>{
                    console.log('init captain | success');
                }).catch((ret)=>{
                    console.log('init captain | error',ret);
                });
            }else{ // found a captain
                console.log('found captain | success',results.rows._array);
            }
            
        }).catch((ret)=>{
            console.log("finding captain | error",ret);
        });
    }).catch((ret)=>{
        console.log('create user table | error');
        // console.log(results);
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
                    reject(results);
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