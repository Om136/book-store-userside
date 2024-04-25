import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Pheonix13",
  database: "dbmslab",
});

app.listen(5000, () => console.log("server started"));

app.get("/", (req, res) => res.json("Hello World"));

app.get("/books", (req, res) => {
  const filter = req.query.filter;
  const data = req.query.search;
  switch (filter) {
    case "all":
      var q = "SELECT * FROM books";
      break;
    case "title":
      var q = `SELECT * FROM books WHERE title= ?`;
      break;
    case "price":
      var q = "SELECT * FROM books WHERE price=?";
    case "category":
      var q = "SELECT * FROM books WHERE category=?";
      break;
    default:
      var q = "SELECT * FROM books";
  }
  if (filter === "all") {
    db.query(q, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        res.json(data);
      }
    });
  } else {
    db.query(q, data, (error, data) => {
      if (error) {
        res.json(error);
      } else {
        res.json(data);
      }
    });
  }
});
app.put("/buy/:id", (req, res) => {
  const id = req.params.id;
  const q = "UPDATE BOOKS SET stock=stock-? WHERE id=?";
  const values = [req.body.stock];
  db.query(q, [...values, id], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      const q2 =
        "INSERT INTO orders (customer_name,book_id,quantity,amount) VALUES (?,?,?,?)";
      const values2 = [
        req.cookies.username,
        id,
        req.body.stock,
        req.body.stock,
      ];
      console.log(req.cookies.username);
      db.query(q2, values2, (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message1: "book purchased successfully",
            message2: "order placed successfully",
          });
        }
      });
    }
  });
});
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const q = "INSERT INTO customer (name,password) VALUES (?,?)";
  db.query(q, [username, password], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("user registered successfully");
    }
  });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM customer WHERE name=? AND password=?";
  db.query(q, [username, password], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      if (data.length > 0) {
        res.cookie("username", username, {
          maxAge: 900000,
          httpOnly: true,
          sameSite: "lax",
        });
        res.json("login successful");
      } else {
        res.json("login failed");
      }
    }
  });
});
app.get("/check-cookie", (req, res) => {
  res.json({ username: req.cookies.username });
});

app.get("/orders", (req, res) => {
  const q = "SELECT * FROM order_book_info";
  db.query(q, (err, data = []) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
}
);
