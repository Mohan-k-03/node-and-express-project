import express from "express";

const app = express();

const PORT = 3000;

const users = [
  { id: 1, user_name: "mohan" },
  { id: 2, user_name: "arul" },
  { id: 3, user_name: "kumar" },
  { id: 4, user_name: "revathy" },
  { id: 5, user_name: "muthu" },
];
app.get("/", (req, res) => {
  res.send({ msg: "root" });
});
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
  return res.status(404).send({msg:'user not found'})
  //   console.log(user)
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT} `);
});
