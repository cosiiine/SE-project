import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase(
    'db.test',
);

export const STATUS = {
    DENY : 0,
    WAITING : 1,
    ACCEPT : 2
}

// key + userId + year + month + date + records + check(0,1,2)
// 
export function createWorkTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS works" +
            "(" +
            "key INTEGER PRIMARY KEY AUTOINCREMENT," + // record key
            "userId INTEGER NOT NULL," + // user id
            "year INTEGER NOT NULL," +
            "month INTEGER NOT NULL," +
            "date INTEGER NOT NULL," +
            "records TEXT NOT NULL," + // stringify object
            "status INTEGER NOT NULL," + // check 是內建字不能用
            "workTimeSum INTEGER," +
            "contWorkTime INTEGER," +
            "contBreakTime INTEGER" +
            ");",
            [],
            (tx, results) => {
                console.log("create work table | success");
            },
            (tx, results) => {
                console.log('create work table | error');
                console.log(results);
            }
        )
    });
};

export function deleteWorksTable () {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE works",
            [],
            (tx, results) => {
                console.log("delete works table success");
            },
            (tx, results) => {
                console.log('delete works table error');
                console.log(results);
            }
        )
    });
};

export function deleteAllWorks () {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM works",
                [],
                (tx, results) => {
                    console.log("delete works success");
                },
                (tx, results) => {
                    console.log('delete works error');
                    console.log(results);
                }
            )
        });
    });
};

export function insertWork (userId, dateObj, records, status, timeData) { // records is a json_string
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO works (userId, year, month, date, records, status, workTimeSum, contWorkTime, contBreakTime)" +
                "VALUES (?,?,?,?,?,?,?,?,?)",
                [userId,dateObj.getFullYear(),(dateObj.getMonth()+1) % 13,dateObj.getDate(),records,status,timeData.sum,timeData.work,timeData.break],
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

export function setWorkStatus (userId, year, month, date, status) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "UPDATE works SET status=?" + 
                "WHERE userId=? AND year=? AND month=? AND date=?",
                [status, userId, year, month, date],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject();
                });
        });
    });
};

export function deleteWorksFromUser (userId) {
    const str = `DELETE FROM works WHERE userId=${userId}`;
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                str,
                [],
                (_, results) => {
                    resolve(results);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};

export function deleteWorksFromKey (key) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "DELETE FROM works " +
                "WHERE key=?"
                [key],
                (_, results) => {
                    resolve(results);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};

export function deleteWorks (userId, year, month, date) {
    const str = `DELETE FROM works WHERE userId=${userId} AND year=${year} AND month=${month} AND date=${date}`;
    console.log(str);
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                // 出了奇怪bug
                // "DELETE FROM works WHERE userId=? AND year=? AND month=? AND date=?"
                // [userId, year, month, date],
                str,
                [],
                (_, results) => {
                    resolve(results);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};

// export function getNearWorks () {
//     return new Promise((resolve, reject) => {
//         db.transaction(tx => { 
//             tx.executeSql (
//                 "SELECT * FROM works " +
//                 "ORDER BY key DESC" + 
//                 "LIMIT 30",
//                 (_, results) => {
//                     resolve(results.rows._array);
//                 },
//                 () => {
//                     reject();
//                 });
//         });
//     });
// };

// export function getNameNearWorks (name) {
//     return new Promise((resolve, reject) => {
//         db.transaction(tx => { 
//             tx.executeSql (
//                 "SELECT * FROM works " +
//                 "WHERE name=?" +
//                 "ORDER BY key DESC" + 
//                 "LIMIT 30",
//                 [name],
//                 (_, results) => {
//                     resolve(results.rows._array);
//                 },
//                 () => {
//                     reject();
//                 });
//         });
//     });
// };

export function getMonthWorksByUser (userId, year, month) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works " +
                "WHERE userId=? AND year=? AND month=?" +
                "ORDER BY date DESC",
                [userId, year, month],
                (_, results) => {
                    resolve(results.rows._array);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};

export function getWorks () {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT key FROM works;",
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

export function getWorksByUser (userId) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works WHERE userId=?;",
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

export function getDateWorks (year, month, date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works " +
                "WHERE year=? AND month=? AND date=?" +
                "ORDER BY key",
                [year, month, date],
                (_, results) => {
                    resolve(results.rows._array);
                },
                (_,results) => {
                    reject(results);
                });
        });
    });
};