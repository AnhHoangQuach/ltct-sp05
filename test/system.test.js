//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('System', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done()
  })

  /*
   * Test QA
   */
  describe('CRUD QA', () => {
    it('it should POST success', (done) => {
      let qa = {
        content: 'How to fix the bug?',
      }
      chai
        .request(server)
        .post('/api/system/qa/create')
        .send(qa)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Create Question Success')
          done()
        })
    })
  })

  /*
   * Test Email
   */
  describe('CRUD Email', () => {
    it('it should POST success', (done) => {
      let settingEmail = {
        code: 1,
        emailContent: '<h1>Hello Guys</h1>',
      }
      chai
        .request(server)
        .post('/api/system/email')
        .send(settingEmail)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Setting Email Success')
          done()
        })
    })
  })
})
