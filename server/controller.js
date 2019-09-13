module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { name, price, image_url } = req.body;
    db.create_product([name, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ err: "no Bueno" });
        console.log(err);
      });
  },
  getProducts: async (req, res) => {
    const db = req.app.get("db");
    let products = await db.get_inventory();
    res.status(200), send(products);
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_product(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ err: "something is wrong" });
        console.log(err);
      });
  }
};
