const express=require('express')
const cors=require('cors')
const app=express()
const port=3068
const db=require('./config/db')
const router=require('./config/routes')
app.use(express.json())
app.use(cors())
db()
app.use(router)

app.listen(port,()=>{
    console.log('server running on port ',port);
})