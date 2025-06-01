var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      res.render('filmes', {'lfilmes' : resp.data, tit : 'titulo'})
    })
    .catch(erro => {
      res.status(500).render('error', {'error' : erro})
    })
});

router.get('/edit/:id', function(req, res) {
  const id = req.params.id;
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then(resp => {
      res.render('filmeEdit', {'filme': resp.data})
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error})
    });
});

router.post('/edit/:id', function(req, res) {
  const id = req.params.id;
  
  let genres = req.body.generos;
  if (typeof genres === 'string') {
    try {
      if (genres.startsWith('[') && genres.endsWith(']')) {
        genres = JSON.parse(genres);
      } else {
        genres = genres.split(',').map(g => g.trim());
      }
    } catch (e) {
      genres = [genres];
    }
  }

  let cast = req.body.Ator;
  if (typeof cast === 'string') {
    try {
      if (cast.startsWith('[') && cast.endsWith(']')) {
        cast = JSON.parse(cast);
      } else {
        cast = cast.split(',').map(actor => actor.trim());
      }
    } catch (e) {
      cast = [cast];
    }
  }

  const updatedFilm = {
    title: req.body.nome,
    year: req.body.Ano,
    cast: cast,
    genres: genres,
    id: id
  };
  
  axios.put(`http://localhost:3000/filmes/${id}`, updatedFilm)
    .then(() => res.redirect('/filmes/'))
    .catch(error => {
      console.log(error);
      res.render('error', {error: error});
    });
});

router.get('/delete/:id', function(req, res) {
  const id = req.params.id;
  axios.delete(`http://localhost:3000/filmes/${id}`)
    .then(() => res.status(200).redirect('/'))
    .catch(error => {
      console.log(error);
      res.render('error', {error: error})
    });
});


router.get('/ator/:nome', function(req, res) {
  const nome = req.params.nome;
  
  console.log(nome);

  axios.get(`http://localhost:3000/filmes`)
    .then(resp => {
      const filmesAtor = resp.data.filter(filme => filme.cast && filme.cast.includes(nome));
      res.render('filmesAtor', {'lfilmes': resp.data.filter(filme => filme.cast && filme.cast.includes(nome))})
    })
    .catch(error => {
      console.log(error);
      res.render('error', {error: error})
    });
});

module.exports = router;