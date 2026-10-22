import { User } from "./src/mongoose/user.mjs";
import { cookie } from "express-validator";
import express from "express";
import { createUserValidationSchema } from "./src/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import userRouter from "./src/routes/users.mjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import mongoose from "mongoose";
import { comparePassword, hashPassword } from "./src/utils/helper.mjs";

const app = express();
mongoose
  .connect("mongodb://localhost/express")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(`errorff ${err}`));
app.use(express.json());
app.use(
  session({
    secret: "romba secret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: "user_name", passwordField: "password" },
    async (user_name, password, done) => {
      try {
        const user = await User.findOne({ user_name: user_name });
        if (!user) {
          return done(null, false, { message: "invalid" });
        }
        if (comparePassword(password , user.password)) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, false);
        // return res.status(404).send({ msg: "not found" });
      }
    },

    // return done(null, user);
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // const user = user.find((u) => {
  // u.id === id;
  try {
    const user = await User.findById({ id });
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});
app.use(userRouter);
const PORT = 3000;

// res.send({ msg: "root" });
// app.get("/", (req, res) => {
// });

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
  { id: 1, user_name: "mohan", password: "1234" },
  { id: 2, user_name: "arul", password: "12354" },
  { id: 3, user_name: "kumar", password: "223" },
  { id: 4, user_name: "revathy", password: "221" },
  { id: 5, user_name: "muthu", password: "33" },
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

app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    // console.log(req["express-validator#contexts"]);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    // console.log(result);
    const body = matchedData(req);
    body.password=hashPassword(body.password);
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ msg: "user not there" });
    }
  },
);

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

app.get("/jjj", (req, res) => {
  res.cookie("codeword", "idk", { maxAge: 60000 });
  console.log(req.session);
  console.log(req.session.id);

  res.send({ msg: "root" });
});

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || "login" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "login success", user });
    });
  })(req, res, next);
});
