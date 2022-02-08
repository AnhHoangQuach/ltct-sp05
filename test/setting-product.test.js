//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Setting Product', () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done()
  })

  /*
   * Test
   */
  describe('CRUD setting product', () => {
    it('it should POST success', (done) => {
      let settingProduct = {
        value: 'S',
        categories: ['61ec51f5318e8b487fdb3b47'],
        priceIncrease: 5000,
      }
      chai
        .request(server)
        .post('/api/setting-product/create')
        .send(settingProduct)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Setting Product Created')
          done()
        })
    })
    it('it should GET success', (done) => {
      chai
        .request(server)
        .get('/api/setting-product')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('data')
          done()
        })
    })
    it('it should DELETE success', (done) => {
      let settingProductID = '62011c9a77dd64fe8fd029e1'
      chai
        .request(server)
        .delete('/api/setting-product/' + settingProductID)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Deleted Setting Product')
          done()
        })
    })
    it('it should UPDATE success', (done) => {
      let settingProductUpdate = {
        value: 'xanh da trời',
        categories: ['6201281477dd64fe8fd02a0d', '6201279277dd64fe8fd02a09'],
      }
      let settingProductID = '620205dd4a2e7a8fb7874632'
      chai
        .request(server)
        .patch('/api/setting-product/' + settingProductID)
        .send(settingProductUpdate)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql('success')
          res.body.should.have.property('message').eql('Update Setting Product')
          done()
        })
    })
  })
})
