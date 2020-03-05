const Chance = require("chance");
const express = require("express");

const pursesRoutes = express.Router();
const chance = new Chance();

function createPurse(purse = {}) {
  const name = chance.pickone([
    "Versace",
    "Louis Vuitton",
    "Chanel",
    "Gucci",
    "Saint Laurent",
    "Valentino"
  ]);

  return {
    id: Math.floor(Math.random() * 100000000),
    price: chance.dollar({ min: 300, max: 6000 }),
    name,
    description: chance.paragraph({ sentences: 3 }),
    image: chance.pickone([
      "https://cache.net-a-porter.com/images/products/1209783/1209783_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1198182/1198182_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1210624/1210624_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1198168/1198168_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1199684/1199684_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1213310/1213310_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1197421/1197421_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1210682/1210682_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1213123/1213123_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1213300/1213300_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1217108/1217108_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1202272/1202272_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1200871/1200871_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1218666/1218666_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1206787/1206787_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1209765/1209765_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1198180/1198180_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1214470/1214470_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1219500/1219500_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1210673/1210673_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1222143/1222143_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1243962/1243962_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1209786/1209786_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1197422/1197422_in_pp.jpg",
      "https://cache.net-a-porter.com/images/products/1213298/1213298_in_pp.jpg"
    ]),
    info: {
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 2015, max: 2019 }),
      color: chance.pickone([
        "Red",
        "Blue",
        "Green",
        "Salmon",
        "Brown",
        "Black"
      ]),
      material: chance.pickone(["Leather", "Synthetic"]),
      size:
        chance.natural({ min: 30, max: 60 }) +
        "cm X " +
        chance.natural({ min: 30, max: 60 }) +
        "cm",
      type: chance.pickone([
        "Clutch",
        "Shoulder bag",
        "Shopping bag",
        "Handbag"
      ]),
      made: chance.pickone(["Italy", "France", "England", "Germany"])
    },
    ...purse
  };
}

let purses = Array.from({ length: 25 }, (_, i) => createPurse());

pursesRoutes.get("/", (req, res) => {
  const myPurses = Array.from(
    { length: Number(req.query.purses_length) },
    (_, i) => createPurse()
  );

  res.json(myPurses);
});

pursesRoutes.get("/:todoId", (req, res) => {
  const purseId = req.params.todoId;
  const purse = purses.find(p => p.id == purseId);
  res.status(200).json({
    message: purse
  });
});

pursesRoutes.post("/", (req, res) => {
  const newPurse = createPurse(req.body);
  purses.push(newPurse);

  res.json(newPurse);
});

module.exports = pursesRoutes;
