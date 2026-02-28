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
app.get('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
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
    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: 'User created successfuly',
            data: results[0]   
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

// path = PUT /user/:id // สำหรับการแก้ไขข้อมูล
app.put('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id])
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
})


    // user จาก id ที่ส่งมา
    // let seletedIndex = users.findIndex(user => user.id == id);

    // อัพเดตข้อมูล user
    // users[seletedIndex].name = updatedUser.name || users[seletedIndex].name;
    // users[seletedIndex].email = updatedUser.email || users[seletedIndex].email;
    // if (updatedUser.name){
    //     users[seletedIndex].name = updatedUser.name;
    // }
    // if (updatedUser.email){
    //     users[seletedIndex].email = updatedUser.email;
    // }

    // เอาข้อมูลที่ update ส่ง response กลับไป
    // res.json({
    //     message: 'User added successfully',
    //     data: {
    //         user: updatedUser,
    //         indexUpdated: seletedIndex
    //     }
    // });

// path = DELETE /user/:id // สำหรับการลบข้อมูล
app.delete('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})
    
    // หา index ของ user ที่ต้องการลบจาก id ที่ส่งมา
    // let seletedIndex = users.findIndex(user => user.id == id);
    // // ลบ user จาก array โดยใช้ delate
    // users.splice(seletedIndex, 1);

    // res.json({
    //     message: 'User deleted successfully',
    //     indexDeleted: seletedIndex
    // });

app.listen(port, async () => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});
