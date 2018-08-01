var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlServer = 'http://localhost:5000';

var app = express();

var teams = [
  {
    id: 1,
    logo: 'http://www.logo-designer.co/wp-content/uploads/2017/01/2017-interbrand-logo-design-juventus-football.png',
    name: 'Juventus',
    country: 'Italie',
    stadium: 'Juventus Stadium',
    coach: 'Allegri',
    founded: 1897,
    nbCup: 5
  },
  {
    id: 2,
    name: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/768px-Paris_Saint-Germain_Logo.svg.png',
    country: 'France',
    stadium: 'Parc des Princes',
    coach: 'Emery',
    founded: 1970,
    nbCup: 2
  },
  {
    id: 3,
    logo: 'https://upload.wikimedia.org/wikipedia/fr/a/aa/Blason_RC_Strasbourg_1976.png',
    name: 'RC Strasbourg',
    country: 'France',
    stadium: 'La Meinau',
    coach: 'Laurent',
    founded: 1902,
    nbCup: 1
  },
  {
    id: 4,
    logo: 'http://www.logo20.com/logo-real-madrid/logo-real-madrid-2.png',
    name: 'Real Madrid',
    country: 'Espagne',
    stadium: 'Santiago Bernabeu',
    coach: 'Zidane',
    founded: 1912,
    nbCup: 6
  },
  {
    id: 5,
    logo: 'http://images.footmercato.net/club/400x400/13089.png',
    name: 'Gomido',
    country: 'Togo',
    stadium: 'Gomido Arena',
    coach: '',
    founded: 1974,
    nbCup: 2
  },
  {
    id: 6,
    logo: 'https://seeklogo.com/images/A/as-roma-60-s-logo-5422998DC3-seeklogo.com.png',
    name: 'AS Roma',
    country: 'Italie',
    stadium: 'Olimpico',
    coach: 'Di Francesco',
    founded: 1899,
    nbCup: 1
  },
];

var players = [
  {
    id: 1,
    picture: '',
    lastname: 'Del Piero',
    firstname: 'Ale',
    current_team: 'Juventus',
    country: 'Italie',
    position: 'Attaquant'
  },
  {
    id: 2,
    picture: '',
    lastname: 'Buffon',
    firstname: 'Gianluigi',
    current_team: 'Juventus',
    country: 'Italie',
    position: 'Gardien'
  },
  {
    id: 3,
    picture: '',
    lastname: 'Areola',
    firstname: 'Alphonse',
    current_team: 'PSG',
    country: 'France',
    position: 'Gardien'
  },
  {
    id: 4,
    picture: '',
    lastname: 'Rabiot',
    firstname: 'Adrien',
    current_team: 'PSG',
    country: 'France',
    position: 'Milieu'
  },
];

var students = [ 
    {
      id: 1,
      photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
      firstName: 'Paul', 
      lastName: 'Henry', 
      notes: [17,18,19],
      group: 'POEI Java'
    },
    {
      id: 2,
      photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
      firstName: 'Alexis', 
      lastName: 'Jean', 
      notes: [15,10,12],
      group: 'POEI Java'
    },
    {
      id: 3,
      photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
      firstName: 'Patrick', 
      lastName: 'Jacques', 
      notes: [10,7,17],
      group: 'ESD'
    },
        {
      id: 4,
      photo: 'http://static1.ozap.com/articles/7/54/78/77/@/4579052-thomas-30-ans-ostreiculteur-nouvelle-128x128-2.jpg', 
      firstName: 'Alex', 
      lastName: 'Henry', 
      notes: [6,7,17],
      group: 'ESD'
    }
];

// Middlewares
app.use(bodyParser.json()); // le body des requêtes sont parsées (json -> js)
//app.use(express.static('public'));

// Permet les requêtes cross-domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// Routes

// GET
app.get('/teams', (req, res) => res.json(teams));
app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
  let id = req.params.id;
  for (let i=0;i<students.length;i++) {
    if (students[i].id == id) {
      return res.json(students[i]);
    }
  }
  res.status(404).send('Etudiant inconnu');
});

app.get('/players', (req, res) => res.json(players));
app.get('/teams/:team/players', (req, res) => {
  var team = req.params.team;
  var playersFiltered = players.filter(player => player.current_team == team);
  return res.json(playersFiltered);
})


// POST
app.post('/teams', function(req, res) {
  var id = getLastId(teams);
  var team = {
    id: id + 1,
    logo: req.body.logo,
    name: req.body.name,
    country: req.body.country,
    stadium: req.body.stadium,
    coach: req.body.coach,
    founded: req.body.founded,
    nbCup: req.body.nbCup
  };
  teams.push(team);
  res.json(team);
})


// PUT
app.put('/students/:id', (req, res) => {
  // Mise à jour de l'étudiant ciblé
  if (req.body.id) {
    for (let i=0;i<students.length;i++) {
      if (students[i].id == req.body.id) {
        students[i] = req.body; // mise à jour
        break;
      }
    }
  return res.json('Mise à jour réussie !');
  }
  res.status(500).end(); // envoi d'un code erreur au client
});



// Helper functions
function getLastId(arr) {
  var maxId = 0;
  for (var i=0; i<arr.length; i++) {
    if (arr[i].id > maxId) {
      maxId = array[i].id
    }
  }
  return maxId;
}

app.listen(5000, () => console.log('Serveur écoute le port 5000...'));