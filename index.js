import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Model from "./model/postModel.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authMiddleware from "./auth.js";
import multer from "multer";
import Product from "./model/Product.js";
import path from "path";
const __dirname = path.resolve();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".gif") {
      return cb(res.status(400).end("only jpg,png are allowed"), false);
    }
    cb(null, true);
  },
});
let upload = multer({ storage: storage }).single("file");

const app = express();
const port = 5000;

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 100000,
  })
);
mongoose
  .connect("", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/api", (req, res) => res.send("Hello World!"));

app.post("/api/user/signin", (req, res) => {
  Model.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "해당 유저없음",
      });

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      user.makeToken(function (err, user) {
        if (err) return err;
        res
          .cookie("access_token", user.token, { secure: false })
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.post("/api/user/register", (req, res) => {
  const newmodel = new Model(req.body);
  newmodel.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.get("/api/user/auth", authMiddleware, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    image: req.user.image,
    isAuth: true,
  });
});

app.post("/api/uploadImage", authMiddleware, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    if (!req.file) return res.send("Please upload a file");
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.get("/api/user/logout", authMiddleware, (req, res) => {
  console.log(req.user);
  Model.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/product/uploadProduct", authMiddleware, (req, res) => {
  const product = new Product(req.body);
  product.save((err, proInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/product/dogfood", (req, res) => {
  Product.find({ category: "dog-food" }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/catfood", (req, res) => {
  Product.find({ category: "cat-food" }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/detail", (req, res) => {
  Product.findOne({ _id: Object.keys(req.body) }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/search", authMiddleware, (req, res) => {
  console.log();
  Product.findOne({ _id: Object.keys(req.body) }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/catproduct", (req, res) => {
  Product.find({ category: "cat-product" }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/dogproduct", (req, res) => {
  Product.find({ category: "dog-product" }, function (err, product) {
    if (!product)
      return res.json({
        Success: false,
        message: "해당 제품없음",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  });
});

app.post("/api/product/cartItem", authMiddleware, (req, res) => {
  let term = Object.keys(req.body).toString();
  console.log(term);

  if (term) {
    Product.find({ product: new RegExp(term, "i") }).exec((err, products) => {
      console.log(products);
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, products });
    });
  } else {
    Model.findOne({ _id: req.user._id }, (err, userInfo) => {
      if (!userInfo.cart)
        return res.json({ Success: false, message: "카트가 비었습니다." });
      return res.status(200).json(userInfo.cart);
    });
  }
});

app.post("/api/product/deleteitem", authMiddleware, (req, res) => {
  let _title = Object.keys(req.body);

  Model.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: `${_title}` } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;

      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post("/api/product/addProduct", authMiddleware, (req, res) => {
  Model.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duple = false;
    userInfo.cart.forEach((el) => {
      if (req.body.productId === el.id) {
        duple = true;
      }
    });

    if (duple) {
      Model.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.qty": +req.body.total } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json(userInfo.cart);
        }
      );
    } else {
      Model.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              img: req.body.img,
              title: req.body.title,
              id: req.body.productId,
              qty: req.body.total,
              price: req.body.price,
              initprice: req.body.initprice,
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) res.json({ success: false, err });
          return res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

app.post("/api/basket/qty", authMiddleware, (req, res) => {
  Model.findOne({ _id: req.user._id }, (err, userInfo) => {
    console.log(res.body);
    Model.findOneAndUpdate(
      {
        _id: req.user._id,
        "cart.id": req.body.id,
      },
      {
        $inc: { "cart.$.qty": +res.body.total },
      }
    );
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

/* 
app.use(express.static(path.join(__dirname, "client/app/build")));

// 라우트 설정
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/app/build/index.html"));
});
 */

app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
