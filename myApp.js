require('dotenv').config();
let mongoose = require('mongoose');

// Connect to the MongoDB database
let uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a person schema
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

// Create a person model
const Person = mongoose.model("Person", personSchema);

// Use PERSON model to save a single person
const createAndSavePerson = (done) => {
  const janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  
  janeFonda.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create an array of persons
let arrayOfPeople = [
  {name: "Buddy", age: 63, favoriteFoods: ["hamburger", "beans", "eggs"]},
  {name: "Nick Boudreau", age: 49, favoriteFoods: ["chicken", "rolls", "peanut butter"]},
  {name: "Dennis the Meance", age: 11, favoriteFoods: ["hot dogs", "hamburgers", "popcorn"]}
];

// Use the PERSON model to save many people at once
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// Use PERSON model to find people by name
//let personName = "Jane Fonda";
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

// Use the PERSON model to find a single person with the favorite FOOD
//let food = "beans";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use the PERSON model to find a person by its ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find a PERSON and then add a food to their favorites array
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    
    // Add hamburger to the PErson's favorite food
    person.favoriteFoods.push(foodToAdd);
    
    // Save the updated PERSON
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Find a person by name and update their age
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.error(err);
    done(null, updatedDoc);
  });
};

// Find a person using their ID and remove them
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Remove multiple documents using a given parameter
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err,res) => {
    if (err) return console.error(err);
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if (err) console.error(err);
      done(null, data);
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
