import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase(
    'db.test',
);

export const TASKTYPE = {
    WORK1 : 1,
    WORK2 : 2,
    WORK3 : 3,
    EAT : 4,
    BREAK: 5
}

// key + name + color + taskType
// 
export function createTaskTable () {  // 儲存工作類型 task
    const taskArgs = [
        {name: "工作1", color:"#D34C5E"},
        {name: "工作2", color:"#F5C63E"},
        {name: "工作3", color:"#19AC9F"},
        {name: "用餐", color:"#3785D6"},
        {name: "休息", color:"#cfcfcf"}
    ];
    new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tasks" +
                "(" +
                "taskType INTEGER NOT NULL," + // record key 手動輸入 1~5
                "name TEXT NOT NULL," + // 使用者自訂名稱
                "color TEXT NOT NULL" + // 顏色
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
        console.log("create task table | success");
        // console.log(results);

        new Promise((resolve, reject) => { // check if task exist
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM tasks;",
                    [],
                    (tx, results) => {
                        resolve(results);
                    },
                    (tx, results) => {
                        reject(results);
                    }
                )
            });
        }).then((results)=>{
            if (results.rows.length == 0){ // no task , init task
                taskArgs.forEach((item,index)=>{
                    insertTask(index+1,item.name,item.color);
                })
            }else{ // found a captain
                console.log('found tasks | success');
            }
            
        }).catch((ret)=>{
            console.log("finding task | error",ret);
        });
    }).catch((ret)=>{
        console.log('create task table | error');
        // console.log(results);
    });
};

export function insertTask (taskType, name, color) { // exp://10.0.123.132:19000
    db.transaction((tx) => {
        tx.executeSql (
            "INSERT INTO tasks (taskType, name, color)" +
            "VALUES (?,?,?)",
            [taskType, name, color],
            (_, results) => {
                //console.log(results);
            },
            (tx, results) => {
                console.log(results);
            }
        )
    });
};

export function deleteAllTasks () {
    db.transaction((tx) => {
        tx.executeSql(
            "DROP TABLE tasks;",
            [],
            (tx, results) => {
                console.log("delete all tasks | success");
            },
            (tx, results) => {
                console.log('delete all tasks | error');
                console.log(results);
            }
        )
    });
};

export function getAllTasks () { // 
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM tasks",
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

export function getWorkTasks () { // 
    return new Promise((resolve, reject) => {
        db.transaction(tx => { 
            tx.executeSql (
                "SELECT * FROM tasks WHERE taskType<=3",
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

export function updateTasks (array) {
    array.map((item)=>
        db.transaction(tx => { 
            tx.executeSql (
                "UPDATE tasks SET name=? WHERE taskType=?",
                [item.name,item.taskType],
                (_, results) => {
                },
                (_,results) => {
                }
            );  
        })
    )
};
