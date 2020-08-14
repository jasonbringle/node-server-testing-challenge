const request = require('supertest') //Brings in supertest to use with Jest.  Supertest runs like Axios in that it enables us to do the .Get, .Put etc...
const server = require('./server.js');//Brings in the server that we want to test.
const db = require('./data/db.config')

describe('server.js', () => {
    test('that the testing environment is set up', ()=> {
            expect(process.env.DB_ENV).toBe('testing')
        });

    describe('Get', () => {
        test('Should return 200 ok', () => {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return 200 ok using async', async()=> {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })

    describe('Insert', () => {
        it('Should return status 200 on insert', async ()=> {
            let data = {    
                name: "Judy", 
                hair_color: "Purple"
            }
            const res =  await request(server).post('/api/members').send(data)
            expect(res.status).toBe(200)
            await request(server).delete('/api/members/:0')

        })

        it("Should return error code 500 when mallformed submission", async ()=> {
            let brokeData = {
                things: "Broken"
            }

            const res = await request(server).post('/api/members').send(brokeData)
            expect(res.status).toBe(500)
        })
    })

    describe('Delete', () => {
        let res = {}
        beforeEach(async ()=>{
            await db('members').truncate();
            let newMember = {name: "Stephen",hair_color: "Grey"}
            await request(server).post('/api/members').send(newMember)
            let addedMember = await db('members').where({name: newMember.name})
            res = await request(server).delete(`/api/members/${addedMember[0].id}`)
        })
        it('Should delete and return status 200', async () => {
                expect(res.status).toBe(200)
        });

        it('should return status 404 if member is not found ', async ()=>{
            let res = await request(server).delete("/api/members/")
                expect(res.status).toBe(404)
        })
      });
});

