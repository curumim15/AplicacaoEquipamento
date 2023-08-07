const sql = require("./db.js");

// construtor
const arma = function(arma) {
  this.nome = arma.nome;
  this.descricao = arma.descricao;
  this.tipo_id = arma.tipo_id;
}

arma.insert = (newarma, result) => {
  sql.query('INSERT INTO armas SET ?', newarma, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log("arma inserido: ", { id: res.insertId, ...newarma });
    result(null, { id: res.insertId, ...newarma });
  });
}

arma.findById = (id, result) => {
  sql.query(`SELECT * FROM armas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('arma encontrado: ', res[0]);
      result(null, res[0]);
      return;
    }

    // no caso do filme não ser encontrado
    result({ arma: "not_found" }, null);
  });
};

// Este método, no caso de não receber qualquer nome de filme devolve todos
// os filmes, caso contrário filtra o(s) resultado(s) pelo nome do filme (total ou parcial)
arma.selectAll = (nome, result) => {
  let query;
  query = 'SELECT * FROM armas';

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log("armas: ", res);
    result(null, res);
  });
};


arma.delete = (id, result) => {
  sql.query('DELETE FROM armas WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found arma with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("arma eliminada com o id: ", id);
    result(null, res);
  });
};

arma.deleteAll = result => {
  sql.query("DELETE FROM armas", (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`Eliminada(s) ${res.affectedRows} arma(s)`);
    result(null, res);
  });
};

module.exports = arma;