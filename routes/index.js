var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MobTour Backend' });
});

router.get('/pois', function(req, res, next){
	res.send('Pois listing page');
	//res.render('pois', { title: 'Pois listing page'});
});

router.get('/search', function(req, res, next){
	var db = req.db;
	var collection = db.get('poilist');
	// Uncertainty below this line
	collection.find({name: req.query.key},function(e,docs){
		res.json(docs);
	});
});

router.get('/tours', function(req, res, next){
	var db = req.db;
	var collection = db.get('tourlist');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

router.post('/addpoi', function(req, res){
	var db = req.db;
	var collection = db.get('poilist');
	collection.insert(req.body, function(err, result){
		res.send(
			(err === null) ? { msg : '' } : { msg : err }
			);
	});
});
module.exports = router;
