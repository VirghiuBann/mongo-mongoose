require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let Person = require('./models/person');

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Peter',
    age: 30,
    favoriteFoods: ["Pizza","Hamburger", "Fries"]
  });

  person.save()
  .then((data) => {
    done(null, data);
  })
  .catch((err)=> {
    console.log(err);
    done(err);
  }); 
 
};

const createManyPeople = (arrayOfPeople, done) => {  
  Person.create(arrayOfPeople)
  .then((data) => {
    done(null , data);
  })
  .catch((err) => {
    console.log(err);
    done(err)
  });
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
  const query = { favoriteFoods: { $in: food } };
  
  Person.findOne(query)
  .then((data) => {
    done(null, data);
  })
  .catch((err) => {
    console.log(err);
    done(err);
    });
  };

const findPersonById = (personId, done) => {
  const query = {_id: personId};

  Person.findById(query)
    .then((data) => {
      done(null , data);
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId)
    .then((personData) => {
      personData.favoriteFoods.push(foodToAdd);
      return personData.save();
    })
    .then((personUpdated) => {
      done(null, personUpdated);
    })
    .catch((err) => {
       console.log(err);
          done(err);
    });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const filter = {name: personName};
  const ageToUpdate = {age: ageToSet};

  Person.findOneAndUpdate(filter, ageToUpdate, {new: true})
  .then((data) => {
    console.log(data);
    done(null, data);
  })
  .catch((err) => {
    console.error(err);
    done(err);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
  .then((removedPerson) => {
    done(null, removedPerson)
  })
  .catch((err) => {
    console.log(err);
    done(err);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const filter = {name: nameToRemove};

  Person.deleteMany(filter)
  .then((removedPerson) => {
    done(null, removedPerson)
  })
  .catch((err) => {
    console.log(err);
    done(err);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = {favoriteFoods: {$in: foodToSearch}};


  Person.find(query)
  .select('name favoriteFoods')
  .sort('name')
  .limit(2)
  .exec()
  .then((resultData) => {
    console.log(resultData)
    done(null , resultData);
  })
  .catch((err) => {
    console.error(err);
    done(err);
  });

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
