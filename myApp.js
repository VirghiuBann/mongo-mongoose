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

const arrayOfPeople = [
  {
    name: "Peter",
    age: 20,
    favoriteFoods: ["Fries", "Pizza", "Soda Pop"]
  },
  {
    name: "Maria",
    age: 25,
    favoriteFoods: ["Pizza", "Hamburger", "orange fruit"]
  },
  {
    name: "Benjamin",
    age: 30,
    favoriteFoods: ["Pizza", "Hod Dogs", "Water Melon"]
  }
];
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
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
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
