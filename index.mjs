import express from "express";

const app = express();

const PORT = 3000;

//project queiry
app.get("/", (req, res) => {
  res.send({ msg: "root" });
});
const project = [
  { id: 1, item: "amazon-clone " },
  { id: 2, item: "instagram-clone " },
  { id: 3, item: "AI-crm module " },
  { id: 4, item: "todo list " },
  { id: 5, item: "calculator " },
  { id: 6, item: "stone-paper-scissor game " },
];

app.get("/api/project", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  console.log(req.query);
  console.log(filter, value);
  if (filter && value) {
    return res.send(
      project.filter((item) => item[filter].toLowerCase().includes(value)),
    );
  }
  res.send({ project });
});

app.get("/api/project/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log(id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "item not found" });
  }
  const item = project.find((project) => project.id === id);
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
//query parameter
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  // console.log(req.query);
  // console.log(filter, value);
  if (filter && value) {
    return res.send(
      users.filter((user) => user[filter].toLowerCase().includes(value)),
    );
  }

  res.send({ users });
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  if (isNaN(id)) {
    return res.status(400).send({ msg: "bad Request, invalid Id" });
  }

  // const user = users.find((user) => user.id === id);
  // if (user) {
  //   return res.send(user);
  // }
  return res.status(404).send({ msg: "user not found" });
  //   console.log(user)
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT} `);
});

// http://localhost:3000/api/users?filter=user_name&value=arul
// http://localhost:3000/api/project?filter=item&value=ama
