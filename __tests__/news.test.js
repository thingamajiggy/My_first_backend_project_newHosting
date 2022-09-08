const app = require("../app.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return db.end();
});

describe("GET", () => {
    it("Should return an array of topic objects, each of which should have the following properties", () => {

        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((response) => {
                response.body.topics.forEach((topic) => {

                    expect(topic).toHaveProperty("slug", expect.any(String));
                    expect(topic).toHaveProperty("description", expect.any(String));

                });
            });
    });

    it("Should return the intended error message", () => {
        return request(app)
            .get("/api/banana")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Page not found");
            });
    });

    describe("GET /api/articles/:article_id", () => {
        it("Should return an array of articles objects", () => {
            return request(app)
                .get(`/api/articles/2`)
                .expect(200)
                .then(({ body }) => {
                    expect(body).toEqual({
                        author: 'icellusedkars',
                        title: 'Sony Vaio; or, The Laptop',
                        article_id: 2,
                        body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                        topic: 'mitch',
                        created_at: '2020-10-16T05:03:00.000Z',
                        votes: 0
                    })
                })
        });
    })

    it("Should return the intended error message", () => {
        return request(app)
            .get("/api/articles/999999999")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Page not found");
            });
    });
})

