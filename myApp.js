require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person = require('./models/person');

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Peter',
    age: 30,
    favoriteFoods: ["Pizza","Hamburger", "Fries"]
  });

  person.save(function(err, data) {
    if(err) {
      console.log(err);
      done(err);
    } else {
      done(null, data);
    }
  });

};

const createManyPeople = (arrayOfPeople, done) => {  
  Person.create(arrayOfPeople, function(err, data) {
    if(err) {
      console.log(err);
      done(err)
    } else {
      done(null , data);
    }
  })
};


const findPeopleByName = (personName, done) => {
  const personQuery = {name: personName};

  Person.find(personQuery, (err, foundPerson) => {
    if(err) {
      console.log(err);
      done(err);
    } else {
      done(null, foundPerson);
    }
  })
};

const findOneByFood = (food, done) => {
  const query = {favoriteFoods: {$in: food}};
  Person.findOne(query, (err, data) => {
    if(err){
      console.log(err);
      done(err);
    } else {
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  const query = {_id: personId};

  Person.findById(query, (err, data) => {
    if(err) {
      console.log(err);
      done(err);
    }else {
      done(null , data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, personData) => {
    if(err) {
      console.log(err);
      done(err);
    } else {
      personData.favoriteFoods.push(foodToAdd);
      personData.save((err, personUpdated) => {
        if(err){
          console.log(err);
          done(err);
        } else {
          done(null, personUpdated);
        }
      });      
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
