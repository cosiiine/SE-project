import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase(
    'db.work',
);

// name + year + month + date + work + check
// 
export function createWorkTable () {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS works" +
                "(" +
                "no INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "name TEXT NOT NULL," +
                "year INTERGER NOT NULL," +
                "month INTERGER NOT NULL," +
                "date INTERGER NOT NULL," +
                "work TEXT NOT NULL," +
                "check INTERGER NOT NULL," +
                ");",
                [],
                (tx, results) => {
                    console.log("create work table success");
                },
                (tx, results) => {
                    console.log('error create work table');
                    console.log(results);
                }
            )
        });
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

export function insertWork (name, year, month, date, work, check) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO works (name, year, month, date, work, check)" +
                "VALUES (?,?,?,?,?,?)",
                [name, year, month, date, work, check],
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

export function checkWorks (name, year, month, date, check) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "UPDATE works SET check=?" + 
                "WHERE name=? AND year=? AND month=? AND date=?",
                [check, name, year, month, date],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject();
                });
        });
    });
};

export function deleteWorks (name, year, month, date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "DELETE FROM works " +
                "WHERE name=? AND year=? AND month=? AND date=?"
                [name, year, month, date],
                (_, results) => {
                    resolve(results);
                },
                () => {
                    reject();
                });
        });
    });
};

export function getNearWorks () {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works" +
                "ORDER BY no DESC" + 
                "LIMIT 30",
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
    });
};

export function getNameNearWorks (name) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works" +
                "WHERE name=?" +
                "ORDER BY no DESC" + 
                "LIMIT 30",
                [name],
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
    });
};

export function getNameMonthWorks (name, year, month) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works" +
                "WHERE name=? AND year=? AND month=?" +
                "ORDER BY no DESC" + 
                "LIMIT 30",
                [name, year, month],
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
    });
};

export function getDateWorks (year, month, date) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM works" +
                "WHERE year=? AND month=? AND date=?" +
                "ORDER BY no",
                [year, month, date],
                (_, results) => {
                    resolve(results.rows._array);
                },
                () => {
                    reject();
                });
        });
    });
};