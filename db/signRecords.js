import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase(
    'db.test',
);

// key + userId + date + time + record
// 
export function createSignTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS signs" +
            "(" +
            "key INTEGER PRIMARY KEY AUTOINCREMENT," + // record key
            "userId INTEGER NOT NULL," + // user id
            "date TEXT NOT NULL," +
            "time TEXT NOT NULL," +
            "record TEXT NOT NULL" + // check 是內建字不能用
            ");",
            [],
            (tx, results) => {
                console.log("create sign table | success");
            },
            (tx, results) => {
                console.log('create sign table | error');
                console.log(results);
            }
        )
    });
};

// export function deleteAllWorks () {
//     return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 "DELETE FROM works",
//                 [],
//                 (tx, results) => {
//                     console.log("delete works success");
//                 },
//                 (tx, results) => {
//                     console.log('delete works error');
//                     console.log(results);
//                 }
//             )
//         });
//     });
// };

export function insertSign (userId, date, time, record) { // 登入登出紀錄
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO signs (userId, date, time, record)" +
                "VALUES (?,?,?,?)",
                [userId, date,time,record],
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

export function getSigns (userId) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM signs WHERE userId=? " +
                "ORDER BY key DESC " + 
                "LIMIT 10;",
                
                [userId],
                (_, results) => {
                    resolve(results.rows._array);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};

export function getAllSigns () {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM signs ",
                [],
                (_, results) => {
                    resolve(results.rows._array);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};
