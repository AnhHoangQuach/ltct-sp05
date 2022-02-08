//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Setting Product Category', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done()
  })

  /*
   * Test
   */
  describe('CRUD setting product category', () => {
    it('it should POST success', (done) => {
      let settingProductCategory = {
        name: 'Bộ-24 ly',
      }
      chai
        .request(server)
        .post('/api/setting-product-category/create')
        .send(settingProductCategory)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Setting Product Category Created')
          done()
        })
    })
    it('it should GET success', (done) => {
      chai
        .request(server)
        .get('/api/setting-product-category')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('data')
          done()
        })
    })
    it('it should DELETE success', (done) => {
      let settingProductCategoryID = '6201281477dd64fe8fd02a0d'
      chai
        .request(server)
        .delete('/api/setting-product-category/' + settingProductCategoryID)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          done()
        })
    })
    it('it should UPDATE success', (done) => {
      let settingProductCategoryUpdate = {
        name: 'Bộ-200 ly',
      }
      let settingProductCategoryID = '6201279277dd64fe8fd02a09'
      chai
        .request(server)
        .patch('/api/setting-product/' + settingProductCategoryID)
        .send(settingProductCategoryUpdate)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Updated Setting Product Category')
          done()
        })
    })
  })
})
