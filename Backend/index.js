// ทำการ import http module เพื่อสร้าง server
// const http = require('http');
// const host = 'localhost';
// const port = 8000;

// // กำหนดค่าเริ่มต้นของ server เมื่อเปิดใช้งาน เว็บผ่านเบราว์เซอร์ ที่localhost:8000
// const requestListener = function(req, res){
//     res.writeHead(200);
//     res.end('My First Server!');
// }

// // run server
// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running at http://${host}:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000

app.use(bodyParser.json());

let users = []
let counter = 1;

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    })    
}

// path = GET /users สำหรับ get ข้อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})


// app.get('/testdb', (req, res) => {
//     mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'webdb',
//         port: 8820
//     }).then((conn) => {
//         conn.query('SELECT * FROM users')
//             .then((results) => {
//                 res.json(results[0]);
//             }).catch((err) => {
//                 console.error(err);
//                 res.status(500).json({error: 'Database query errpr'});
//             });
//     })
// })

// กรณีที่ id ไม่มีอยู่จริง + การทำแบบลำดับขั้นตอน
// async คือ ฟังก์ชันที่มีงานที่ต้องรอ return เป็น promise เสมอ + อนุญาตให้ใช้ await
// await คือ การหยุดบรรทัดนั้นไว้จนกว่าจะทำงานเสร็จ

// app.get('/testdb-new', async (req, res) => {
//     try{
//         const conn = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'root',
//             database: 'webdb',
//             port: 8820
//         })    
//         const [results] = await conn.query('SELECT * FROM users');
//         res.json(results[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({error: 'Database query errpr'});
//     }
// })


// path = GET /users // การดึงข้อมูลเท่านั้น
// app.get('/users',(req, res) => {
//     res.json(users);
// })

// path = POST /users // การส่งข้อมูล บาง post สามารถดึงข้อมูลได้เหมือน get
app.post('/users', async (req, res) => {
   let user = req.body;
   const results = await conn.query('INSERT INTO users SET ?', user);
   console.log('results:', results);
    res.json({
        massage: 'User created successfuly',
        data: results[0]
   });
})

// path = PUT /user/:id // สำหรับการแก้ไขข้อมูล
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    // user จาก id ที่ส่งมา
    let seletedIndex = users.findIndex(user => user.id == id);

    // อัพเดตข้อมูล user
    // users[seletedIndex].name = updatedUser.name || users[seletedIndex].name;
    // users[seletedIndex].email = updatedUser.email || users[seletedIndex].email;
    if (updatedUser.name){
        users[seletedIndex].name = updatedUser.name;
    }
    if (updatedUser.email){
        users[seletedIndex].email = updatedUser.email;
    }

    // เอาข้อมูลที่ update ส่ง response กลับไป
    res.json({
        message: 'User added successfully',
        data: {
            user: updatedUser,
            indexUpdated: seletedIndex
        }
    });
})

// path = DELETE /user/:id // สำหรับการลบข้อมูล
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
// หา index ของ user ที่ต้องการลบจาก id ที่ส่งมา
    let seletedIndex = users.findIndex(user => user.id == id);
    // ลบ user จาก array โดยใช้ delate
    users.splice(seletedIndex, 1);

    res.json({
        message: 'User deleted successfully',
        indexDeleted: seletedIndex
    });
})

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});
