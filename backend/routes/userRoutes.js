require('dotenv').config()
const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite3');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

router.get("/", (req, res) => {
  res.send("Index of user routes")
  res.status(200)
})

//user signup 
router.post("/signup", async (req, res) => {
  const { userName, email, password, profilePic } = req.body
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      //return bcrypt error 
      if (err) {
        res.send(err)
        res.status(404)
      }
      //insert data into database  
      db.serialize(() => {
        db.all('INSERT INTO users( userName, email, password ) VALUES(?,?,? )', [userName, email, hash], function (err) {
        
          if (err) {
            console.log("Error occured")
            res.send('Error').status(404)
          } else {
            console.log("User created")
            res.send('Created').status(201)
          }
        })
      })
    });
  });
})



//email availability 
router.post("/email", async (req, res) => {
  const { email } = req.body

  //selecting user from database 
  db.serialize(() => {
    db.all('SELECT * FROM users WHERE email = ? ', [email], function (err, rows) {
      if (err) {
        res.send(err)
        res.status(502)
      } else {
        if (rows.length == 0) {
          res.send(true)
          return res.status(200)
        } else {
          res.send(false);
          return res.status(200)
        }
      }
    })
  })
})


//user login 
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      //return bcrypt error
      if (err) {
        res.send(err)
        res.status(502)
        return;
      }
      //selecting user from database 
      db.serialize(() => {
        db.all('SELECT * FROM users WHERE email = ? ', [email], function (err, rows) {
          if (err) {
            res.send(err)
            res.status(502)
          } else {
            if (rows.length == 0) {
              //user not found
              res.send({ err: "user not found" })
              return res.status(404)
            }
            //compare password with hash
            bcrypt.compare(password, rows[0].password, function (err, result) {
              //generate JWT token
              const { password, ...test } = rows[0]
              console.log("DATA FOR token ", test)
              var token = jwt.sign(test, process.env.JWT_SECRET);
              res.send({ token })
              res.status(200)
            });
            res.status(200)
          }
        })
      })
    });
  });
})


//change password
router.post("/changePW/:id", async (req, res) => {
  const { password, newPassword } = req.body
  const id = req.params.id
  console.log(JSON.stringify(req.body))
  //selecting user from database 
  db.serialize(() => {
    db.all('SELECT * FROM users WHERE uid = ? ', [id], function (err, rows) {
      console.log("User found")

      if (err) {
        res.send(err)
        res.status(502)
      } else {
        //compare password with hash
        bcrypt.compare(password, rows[0].password, function (err, result) {
          //bcrypt new password 
          if (!result) {
            console.log("Passwords do not match")
            res.sendStatus(401)
          } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(newPassword, salt, function (err, newHash) {
                //insert that into db
                db.run('UPDATE users SET password = ? WHERE uid = ?;', [newHash, id], function (err) {
                  if (err) {
                    res.send(err)
                    res.status(502)
                  } else {
                    res.sendStatus(200)
                  }
                })
                res.status(200)
              });
              res.status(200)
            })
          }
        })
      }
    })
  });
});
//delete user 
router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id)
  db.serialize(() => {
    db.run('DELETE FROM  users WHERE uid = ?', [req.params.id], function (err) {
      if (err) {
        res.send(err)
        res.status(502)
      }
    })
  })
  res.send(req.body)
  res.status(200)
})

//updatePassword
router.put("/updatePassword/:id", async (req, res) => {
  console.log(req.params.id)
  db.serialize(() => {
    db.run('UPDATE users SET password = ? WHERE uid = ?', [req.body.password, req.params.id], function (err) {
      if (err) {
        res.send(err)
        res.status(502)
      }
    })
  })
  res.send(req.body)
  res.status(200)
})


//get all users and their data 
router.get("/all", (req, res, next) => {
  db.all("SELECT * from users", function (err, rows) {
    res.send(JSON.stringify(rows, null, 2))
    res.status(200)
  });
});



//change username and email
router.post("/emailUsername/:id", (req, res, next) => {
  console.log(req.body)
  const { email, userName } = req.body
  db.run('UPDATE users SET userName = ? , email = ? WHERE uid = ?;', [userName, email, req.params.id], function (err) {
    if (err) {
      res.send(err)
      res.status(502)
    }
  })
  res.sendStatus(200);
})



module.exports = router