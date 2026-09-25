import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ msg: "root" });
});
const product = [
  { id: 1, item: "amazon-clone " },
  { id: 2, item: "instagram-clone " },
  { id: 3, item: "amazon-clone " },
  { id: 4, item: "amazon-clone " },
  { id: 5, item: "amazon-clone " },
  { id: 6, item: "amazon-clone " },
];

app.get("/api/product", (req, res) => {
  res.send({ product });
});

app.get("/api/product/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log(id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "item not found" });
  }
  const item = product.find((product) => product.id === id);
  if (item) {
    return res.send(item);
  }

  res.send.parseInt(item);
});

const users = [
  { id: 1, user_name: "mohan" },
  { id: 2, user_name: "arul" },
  { id: 3, user_name: "kumar" },
  { id: 4, user_name: "revathy" },
  { id: 5, user_name: "muthu" },
];
app.get("/api/users", (req, res) => {
  res.send({ users });
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  if (isNaN(id)) {
    return res.status(400).send({ msg: "bad Request, invalid Id" });
  }

  const user = users.find((user) => user.id === id);
  if (user) {
    return res.send(user);
  }
  return res.status(404).send({ msg: "user not found" });
  //   console.log(user)
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT} `);
});


// localhost:3000/users?