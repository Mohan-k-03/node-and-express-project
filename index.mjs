import express from "express";
import { createUserValidationSchema } from "./src/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
const app = express();
const PORT = 3000;

app.use(express.json());

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

// app.get("/api/project", (req, res) => {
//   const { filter, value } = req.query;

//   if (filter && value) {
//     const filterKey = String(filter);
//     const searchValue = String(value).toLowerCase();

//     return res.send(
//       project.filter((item) =>
//         String(item[filterKey]).toLowerCase().includes(searchValue),
//       ),
//     );
//   }

//   return res.send({ project });
// });

const getProductIndexById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).send({ msg: "item not found" });
  }

  const item = project.find((projectItem) => projectItem.id === id);
  if (item) {
    return res.send(item);
  }
  req.item = item;

  next();
};

app.get("/api/project/:id", getProductIndexById, (req, res) => {
  //  using a function i we use "getproducidexbyid"

  // const id = parseInt(req.params.id, 10);

  // if (Number.isNaN(id)) {
  //   return res.status(400).send({ msg: "item not found" });
  // }

  // const item = project.find((projectItem) => projectItem.id === id);
  // if (item) {
  //   return res.send(item);
  // }

  // return res.status(404).send({ msg: "project item not found" });

  const item = req.item;
});

const users = [
  { id: 1, user_name: "mohan" },
  { id: 2, user_name: "arul" },
  { id: 3, user_name: "kumar" },
  { id: 4, user_name: "revathy" },
  { id: 5, user_name: "muthu" },
];

const getUserIndexById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "bad Request, invalid Id" });
  }

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "user not found" });
  }
  req.userIndex = userIndex;
  next();
};
app.get("/api/users", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) {
    const filterKey = String(filter);
    const searchValue = String(value).toLowerCase();

    return res.send(
      users.filter((user) =>
        String(user[filterKey]).toLowerCase().includes(searchValue),
      ),
    );
  }

  return res.send({ users });
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).send({ msg: "bad Request, invalid Id" });
  }

  const user = users.find((userItem) => userItem.id === id);
  if (user) {
    return res.send(user);
  }

  return res.status(404).send({ msg: "user not found" });
});

app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  // console.log(req["express-validator#contexts"]);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }
  // console.log(result);
  const body = matchedData(req);
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(newUser);
});

app.put("/api/users/:id", getUserIndexById, (req, res) => {
  //  making a function instead of writeing everytime i use getuserindexbyid
  // const id = parseInt(req.params.id, 10);

  // if (Number.isNaN(id)) {
  //   return res.status(400).send({ msg: "bad Request, invalid Id" });
  // }

  // const userIndex = users.findIndex((user) => user.id === id);
  // if (userIndex === -1) {
  //   return res.status(404).send({ msg: "user not found" });
  // }
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { id, ...body };
  return res.send(users[userIndex]);
});

app.patch("/api/users/:id", getUserIndexById, (req, res) => {
  //  making a function instead of writeing everytime i use getuserindexbyid
  // const id = parseInt(req.params.id, 10);

  // if (Number.isNaN(id)) {
  //   return res.status(400).send({ msg: "bad Request, invalid Id" });
  // }

  // const userIndex = users.findIndex((user) => user.id === id);
  // if (userIndex === -1) {
  //   return res.status(404).send({ msg: "user not found" });
  // }
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  return res.send(users[userIndex]);
});

// app.delete("/api/users/:id", (req, res) => {
// const id = parseInt(req.params.id, 10);

// if (Number.isNaN(id)) {
//   return res.status(400).send({ msg: "bad Request, invalid Id" });
// }

// const userIndex = users.findIndex((user) => user.id === id);
// if (userIndex === -1) {
//   return res.status(404).send({ msg: "user not found" });
// }
// users.splice(userIndex, 1);

// res.sendStatus(200);
// const { body } = req;
// });

app.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  console.log(userIndex);
  users.splice(userIndex, 1);
  res.sendStatus(200);
});

// http://localhost:3000/api/users?filter=user_name&value=arul
// http://localhost:3000/api/project?filter=item&value=ama

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
