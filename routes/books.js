const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const Book = require('../models/Book');
//new post
router.post('/new', function(req, res, next) {
  const book = new Book({
    //userId: "5c93e4f57c117e2370b5cfe0",
    title: 'Egitim',
    description: 'e2',
    published: true,
    comments: [
      { 
        message: "begendim" 
      },
      {
        message: "that's awesome"
      }
    ],
    meta: {
        votes: 5,
        favs: 15
    }
  });
  book.save(function(err,data){
    if(err)
      console.log("error",err)
    res.json(data);  
  });
});
//arama yapma
router.get('/search', (req, res) => {
  /*Book.find({ published: true, title: 'Egitim2' }, (err,data) => { //koşullu search
    if(err)
      console.log(err);
    res.json(data);  
  });*/
  /*
  Book.find({ published: true, title: 'Egitim2'}, 'title comments', (err,data) => { koşul belirterek istenilen sütünlar listelenir
    if(err)
      console.log(err);
    res.json(data);  
  });*/
  Book.find({ }, (err,data) => { //tüm sütunlar listelenir
    if(err)
      console.log(err);
    res.json(data);  
  });
});
//tek bir veri döner
router.get('/searchOne', (req, res) => {
  Book.findOne({ title: 'udemy' }, (err,data) => {
    if(err)
      console.log(err);
    res.json(data);  
  });
});
//Id'ye göre arama yapılır ve tek bir veri döner
router.get('/searchById', (req, res) => {
  Book.findById('5c9286afcd8e6c10e017d834', (err,data) => {
    if(err)
      console.log(err);
    res.json(data);  
  });
});
//update
router.put('/update', (req, res) => {
  Book.update(
    {
      published: false 
    }, 
    { 
      published: true 
    }, //published degeri false olan verilerde published degerler true olur
    {
      multi: true,
      //upsert: true//böylr bir kayıt yoksa ekleme yapılır
    },
    (err,data) => {
      if(err)
        console.log(err);
      res.json(data);  
  });
});
//Id'ye göre update islemi yapılır. oldukca hızlı sonuc doner
router.put('/updateById', (req, res) => {
  Book.findByIdAndUpdate(
    '5c9286afcd8e6c10e017d834', 
    {
      title: "hello word",
      description: "deneme",
      'meta.favs': 100
    },(err,data) => {
      if(err)
        console.log(err);
      res.json(data);  
  });
});
//delete
router.delete('/delete', (req, res) => {
  Book.findById('5c9286afcd8e6c10e017d834', (err, data) => {
    data.remove((err,data) => {
      res.json(data)
    }); //veri once bulunur daha sonra silme islemi yapılır
  });
});
//tekbir method ile veri bulunup silinir
router.delete('/delete2', (req, res) => {
  Book.findOneAndRemove({ _id :'5c9288ebd1ccd01b00fc2771'}, (err, data) => {
    res.json(data);
  });
});
router.delete('/delete3', (req, res) => {
  Book.remove({ published: true }, (err, data) => { //tüm true olanları siler
    res.json(data);
  });
});
//sorting
router.get('/sort', (req, res) => {
  Book.find({}, (err, data) => {
    if(err)
      console.log(err);
    res.json(data);
  }).sort({'meta.favs': 1}).limit(2); //-1 buyukten-kucuge(desc) sıralar 1 kucukten-buyuge(asc), limit ile sadece 2 veri donmesini sagladik
});
//aggregate gruplama islemleri
router.get('/aggregate', (req, res) => {
  Book.aggregate([
    {
      $match: {
        published: true
      }
    },
    /*{
      $group: {
        _id: "$published",
        adet: { $sum: 1 }
      }
    },*/
    {
      $project: {//sadece istenen sütunlar gelsin
        title: 1,
        meta: 1,
      }
    },
    {
      $sort: {
        'meta.favs': -1
      }
    },
    {
      $limit: 2
    },
    {
      $skip: 1 //1.kayittan sonrasını getir
    }
  ], (err, data) => {
    res.json(data);
  });
});
//collection join
router.get('/aggregare-lookup', (req, res) => {
  Book.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId('5c93e4ff7c117e2370b5cfe1')
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: { //istenilen sutunlar gelsin
        title: 1,
        user: '$user',
        //userName: '$user.fullName',
        //userAge: '$user.age'
      }
    }
  ], function(err, data){
    res.json(data);
  });
});

module.exports = router;
