module.exports = {
  create: async (req, res) => {
    const { name, price, img } = req.body;
    const db = req.app.get("db");
    let posts = await db.create_product([name, price, img]);
    res.status(200).send(posts);
  },
  getProducts: async (req, res) => {
    const db = req.app.get("db");
    let products = await db.get_inventory();
    res.status(200).send(products);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let remove = db.delete_product(id)
    res.status(200).send(remove)
  },
  editProduct: async (req,res) => {
      const {name,price,img} = req.body
      const {id} = req.params
      const db = req.app.get('db')
      let edit = await db.update_product([id,name,price,img])
      res.status(200).send(edit)
  }
};
