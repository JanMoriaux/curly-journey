// const fs = require("fs");
// const path = require("path");
const { db, sql } = require("../util/database");

const Cart = require("./cart");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });

    return db.then(db => {
      const request = db.request();
      request.input("title", sql.VarChar, this.title);
      request.input("price", sql.Real, this.price);
      request.input("description", sql.Text, this.description);
      request.input("imageUrl", sql.Text, this.imageUrl);
      return request.query(
        "insert into Prods(title,price,description,imageUrl) values(@title,@price,@description,@imageUrl)"
      );
    });
  }

  static deleteById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //       Cart.deleteProduct(id, +product.price);
    //     }
    //   });
    // });
  }

  static fetchAll(/*cb*/) {
    // getProductsFromFile(cb);

    return db.then(db => db.request().query("SELECT * FROM Prods"));
  }

  static findById(id /*, cb*/) {
    // getProductsFromFile(products => {
    //   const product = products.find(p => p.id === id);
    //   cb(product);
    // });

    return db.then(db => {
      const request = db.request();
      request.input("id", sql.Int, id);
      return request.query("SELECT * FROM Prods WHERE Prods.id=@id");
    });
  }
};
