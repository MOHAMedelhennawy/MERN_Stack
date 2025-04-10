const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('testdb');
    const collection = database.collection('users');

    const numberOfUsers = 100; 
    const users = [];

    for (let i = 0; i < numberOfUsers; i++) {
      const fakeData = {
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        height: faker.number.float({ min: 150, max: 200, precision: 0.1 }),
        isStudent: faker.datatype.boolean(),
        courses: [faker.word.adjective(), faker.word.noun(), faker.word.verb()],
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          country: faker.location.country()
        },
        birthdate: faker.date.past(),
        profileImage: Buffer.from(faker.image.avatar()).toString('base64'),
        notes: null,
        location: {
          type: "Point",
          coordinates: [faker.location.longitude(), faker.location.latitude()]
        }
      };
      users.push(fakeData);
    }

    await collection.insertMany(users);
    console.log(`Data created successfully!`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);