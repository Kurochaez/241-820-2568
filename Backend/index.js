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
const app = express();

const port = 8000

app.use(bodyParser.json());

let users = []
let counter = 1;

// path = GET /users
app.get('/users',(req, res) => {
    res.json(users);
})

// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message: 'User added successfully',
        user: user });
})

// path = PUT /user/:id
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

// path = DELETE /user/:id
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
