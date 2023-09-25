const assert = require('chai').assert;
const request = require('supertest');
const app = require('../index'); // This is the correct import statement


describe('API Tests', () => {
    it('should get all students', (done) => {
      request(app)
        .get('/fetch')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
  
    it('should get a student by ID', (done) => {
      request(app)
        .get('/fetchbyid/1') // Replace 1 with a valid student ID
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
  
    // it('should update a student', (done) => {
    //   request(app)
    //     .put('/update/1') // Replace 1 with a valid student ID
    //     .send({ name: 'Updated Name', marks: 99 }) // Replace with new data
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       done();
    //     });
    // });
  
    // it('should delete a student', (done) => {
    //   request(app)
    //     .delete('/delete/1') // Replace 1 with a valid student ID
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       done();
    //     });
    // });
  
    // it('should post a new student', (done) => {
    //   const newStudent = { name: 'New Student', marks: 95 };
    //   request(app)
    //     .post('/post')
    //     .send(newStudent)
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       done();
    //     });
    // });
  });


  //npx mocha tests/api.test.js
