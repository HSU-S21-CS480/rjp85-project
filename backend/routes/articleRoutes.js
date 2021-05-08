const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite3');
const authenticateJWT = require("../middleware/JWTmiddleware");
const p = require('path')

router.get("/test", (req, res) => {
  res.send("Index of article routes")
  res.status(200)
})

//create an article
//get the list of articles with all the data available 
router.post("/", authenticateJWT, (req, res, next) => {
  const data = req.body.articleObject
  db.serialize(() => {
    db.run('INSERT INTO articles("writer_name","created_on","body","updated_on","title", "writer_id") VALUES(?,?,?,?,?,?)', [data.auther, data.createdOn, data.content, data.updatedOn, data.title ,  data.writerId ], function (err) {
      if (err) {
        console.log(err)
        res.send(err)
        res.status(502)
      } else {
        res.send('success')
        res.status(200)
      }
    })
  });
})

//get the list of articles with all the data available 
router.get("/", (req, res, next) => {
  db.all("SELECT * from articles ORDER BY updated_on desc", function (err, rows) {
    res.send(rows)
    res.status(200)
  });
});

//get a specifc article
router.get("/:id", (req, res, next) => {
  db.all(`SELECT * from articles WHERE id = ${req.params.id} `, function (err, rows) {
    res.send(rows[0])
    res.status(200)
  });
});

//get a set of articles by the user
router.get("/get/:id", (req, res, next) => {
  db.all(`SELECT * from articles WHERE writer_id = ${req.params.id} `, authenticateJWT,function (err, rows) {
    res.send(rows)
    res.status(200)
  });
});


//delete an article 
router.delete("/:id", authenticateJWT, (req, res, next) => {
  db.serialize(() => {
    db.run('DELETE FROM articles WHERE id = ?', [req.params.id], function (err) {
      if (err) {
        console.log(err)
        res.send(err)
        res.status(502)
      } else {
        res.send('success')
        res.status(200)
      }
    })
  });
});



//update article
router.put("/:id", (req, res, next) => {
  const data = req.body
  const id = req.params.id
  db.serialize(() => {
    db.run("UPDATE articles SET body = ? , updated_on =  ?, title = ? WHERE id = ?", [data.content, data.updatedOn, data.title, id], function (err) {
      if (err) {
        console.log(err)
        res.send(err)
        res.status(502)
      } else {
        res.send('success')
        res.status(200)
      }
    })
  });
})



//search article 
router.post("/search", (req, res, next) => {
  const query = req.body.query
  const queryString = `SELECT * FROM articles WHERE body LIKE "%${query}%" OR body LIKE "${query}%" OR body LIKE "%${query}" OR title LIKE "%${query}%" OR title LIKE "${query}%" OR title LIKE "%${query}"`
  console.log(queryString)
  db.all(queryString, function (err, rows) {
    res.send(rows)
    res.status(200)
  });
});

module.exports = router