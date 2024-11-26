import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456chien',
    database : 'test'
  });


app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get('/events', (req, res) => {
    const q="SELECT * FROM events"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/events', (req, res) => {
    const q="INSERT INTO events (`title`,`desc`,`diadiem`,`cover`) VALUES (?)"
    const values=[
        req.body.title,
        req.body.desc,
        req.body.diadiem,
        req.body.cover
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/events/:id", (req,res)=>{
    const eventid=req.params.id;
    const q="DELETE FROM events WHERE id=?"

    db.query(q,[eventid],(err,data)=>{
        if(err) return res.json(err)
        return res.json("event has been deleted successfully")
    })
})

app.put("/events/:id", (req,res)=>{
    const eventId=req.params.id;
    const q="UPDATE events SET `title`=?, `desc`=?, `diadiem`=?, `cover`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.diadiem,
        req.body.cover
    ]

    db.query(q,[...values,eventId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("event has been updated successfully")
    })
})

app.listen(8800,()=>{
    console.log("connected to backend!")
})
