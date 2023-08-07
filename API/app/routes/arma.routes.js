module.exports = app => {
    const armas = require("../controllers/arma.controller.js");
  
    var router = require("express").Router();
  
    // Consultar todos os filmes
    router.get("/", armas.selectAll);
  
    // Consultar um filme pelo id
    router.get("/:id", armas.findById);
  
    // Inserir um novo filme
    router.post("/", armas.insert);
  
    // Apagar um filme pelo id
    router.delete("/:id", armas.delete);
  
    // Apagar todos os filmes
    router.delete("/", armas.deleteAll);
  
    app.use('/api/armas', router);
  };                                       