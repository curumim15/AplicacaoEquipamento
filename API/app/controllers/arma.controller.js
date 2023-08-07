const Arma = require("../models/arma.model.js");

// Inserir um novo filme
exports.insert = (req, res) => {

  // Validar a request

  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da arma deve estar definido."
    });
  }

  // Criar uma "arma"
  const arma = new Arma({
    nome: req.body.nome,
    descricao: req.body.descricao,
    tipo_id: req.body.tipo_id
    
  });


  // Guardar "arma" na base de dados
  Arma.insert(arma, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao inserir a arma..."
      });
    else res.send(data);
  });
};

// Devolver todos os filmes (ou filtrar por determinado nome - total ou parcial)
exports.selectAll = (req, res) => {
  const nome = req.query.nome;
  Arma.selectAll(nome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção da(s) arma(s)..."
      });
    else res.send(data);
  });
};

// Devolver um filme pelo seu id
exports.findById = (req, res) => {
  Arma.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada a arma com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrada a arma com id = " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Apagar um filme pelo seu id
exports.delete = (req, res) => {
  Arma.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi encontrada a arma com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a arma com id = ${req.params.id}.`
        });
      }
    } 
  });
};

// Apagar todos os filmes da base de dados
exports.deleteAll = (req, res) => {
  Arma.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Foi gerado um erro a apagar a totalidade das armas.'
      });
    else res.send({ message: 'Todas as armas foram eliminadas...' });
  });
};