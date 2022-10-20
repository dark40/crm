const db = require('./connection');
const { User, Case, Note } = require('../models');

db.once('open', async () => {

    // add notes
    await Note.deleteMany();

    const notes = await Note.insertMany([
        {content: 'Onboarding.'},
        {content: 'Welcome.'},
        {content: 'Good morning.'},
        {content: 'Good afternoon'},
        {content: 'Goodbye.'},
    ]);

    console.log('notes seeded');

    // add cases
    await Case.deleteMany();

    const cases = await Case.insertMany([
        {firstName: 'Shane', lastName: 'Smith', bio: 'A talented developer', dob: '1/1/1990', createdDate: '01/10/2022', notes: [notes[0]._id, notes[1]._id ]},
        {firstName: 'Peter', lastName: 'Wool', bio: 'A talented musician', dob: '2/5/1993', createdDate: '03/08/2022', notes: [notes[2]._id]},
        {firstName: 'Sue', lastName: 'Alice', bio: 'A talented singer', dob: '4/6/1994', createdDate: '09/03/2022', notes: [notes[3]._id, notes[4]._id]}
    ]);

    console.log('cases seeded');


    // add user
    await User.deleteMany();

    await User.create({
        firstName: 'Freddie',
        lastName: 'Yang',
        email: 'freddie@freddie.com',
        password: '12345678',
        cases: [cases[0]._id, cases[1]._id]
    });

    await User.create({
        firstName: 'Felix',
        lastName: 'Lee',
        email: 'felixe@felix.com',
        password: '12345678',
        cases: [cases[1]._id, cases[3]._id]
    });

    console.log('users seeded');

    process.exit();
})