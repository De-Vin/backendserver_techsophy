var express = require("express")
var mysql = require("mysql")

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"Web@1234",
    database:"newdbfinal"  
})

db.connect((err)=>{
    if(err){
        console.log("unable to connect database");
        //console.log(err)
    }else{
        console.log("connection established succesfully")
    }
})

app.listen(3600,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server started")
    }
})

module.exports = app;

//get the data from db

app.get("/fetch",(req,res)=>{
    db.query("select * from student",function(err,result,fields){
        if(err){
            console.log(err)
        }else{
            res.send(result)
            //console.log(JSON.parse(JSON.stringify(result)))
        }
    })
})

app.get("/fetchbyid/:id",(req,res)=>{
    const fetchid = req.params.id;
    db.query("select * from student where id=?",fetchid,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length==0){
                res.send("User out of bounds")
            }else{
                res.send(result)
            }
        }
    })
})

//update existing user
app.put("/update/:id",(req,res)=>{
    const updateid = req.params.id;
    const name = req.body.name;
    const marks = req.body.marks
    db.query("UPDATE student SET name=?,marks=? WHERE id=?",[name,marks,updateid],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.affectedRows==0){
                res.send("No user not found")
            }else{
                res.send("UPDATED")
            }
        }
    })
})

//delete user in db
app.delete('/delete/:id',(req,res)=>{
    //   /delete with this we can give an (raw)  id in the body and take action also
    const deleteId = req.params.id;
    db.query('delete from student where id=?',[deleteId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.affectedRows==0){
                res.send("No user found to take action")
            }else{
                res.send("deleted");
                console.log(result);
            }
        }
    })
})

//post the data to db
app.post("/post", (req, res) => {
    const name = req.body.name;
    const marks = req.body.marks;
    // Assuming "id" is auto-incremented and doesn't need to be specified in the INSERT statement
    // Use placeholders for the values you want to insert
    db.query("INSERT INTO student (name, marks) VALUES (?, ?)", [name, marks], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error posting data");
        } else {
            console.log("Data posted successfully");
            res.send("POSTED");
        }
    });
});

