const Chance = require("chance");
const express = require("express");

const watchesRoutes = express.Router();
const chance = new Chance();

function createWatch(watch = {}) {
  const name = chance.pickone([
    "Rolex",
    "Vacheron Constantin",
    "Patek Philippe",
    "Hublot",
    "Louis Moinet"
  ]);

  const startColor = generateColor();
  const endColor = generateColor();

  return {
    id: chance.guid(),
    price: chance.dollar(),
    name,
    description: chance.paragraph({ sentences: 3 }),
    image: `https://placeholder.pics/svg/300/${startColor}-${endColor}/000/${encodeURI(
      name
    )}`,
    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender()
    },
    calibre: {
      powerReserve: chance.natural({ min: 10, max: 50 }),
      movement: chance.pickone(["Automatic", "Manual"]),
      movementPerCalibre: chance.natural({ min: 1000, max: 5000 })
    },
    case: {
      material: chance.pickone(["leather", "gold", "steel"]),
      diameter: chance.natural({ min: 30, max: 60 }),
      glass: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    },
    strap: {
      material: chance.pickone(["leather", "gold", "steel"]),
      braceletColor: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    },
    ...watch
  };
}

const generateColor = () =>
  chance
    .color({ format: "hex" })
    .replace("#", "")
    .toUpperCase();

const watches = Array.from({ length: 25 }, (_, i) => createWatch());

watchesRoutes.get("/", (req, res) => {
  res.json(watches);
});

watchesRoutes.get("/:todoId", (req, res) => {
  const watchId = req.params.todoId;

  res.json(watches.find(w => w.id == watchId));
});

watchesRoutes.post("/", (req, res) => {
  const newWatch = createWatch(req.body);
  watches.push(newWatch);

  res.json(newWatch);
});

// watchesRoutes.patch("/:todoId", (req, res) => {
//   const watchId = req.params.todoId;
//   const { description, name, price } = req.body;

//   watches = watches.map(w =>
//     w.id == watchId ? { ...t, description, name, price } : t
//   );

//   res.send(watches.find(w => w.id == watchId));
// });

module.exports = watchesRoutes;
