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

describe("GET /api/topics", () => {

    it("Should return an array of topics objects", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((response) => {
                expect(response.body.topics.length === 0).toBe(false);
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
                    votes: 0,
                    comment_count: '0'
                })
            })
    });

    it("Should return the intended error message", () => {
        return request(app)
            .get("/api/articles/999999999")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Page not found");
            });
    });

    it("Should respond with an error message when passed a bad user ID", () => {
        return request(app)
            .get("/api/articles/not-an-id")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid input");
            });
    });
});

describe("GET /api/users", () => {

    it("Should return an array of users objects", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
                expect(response.body.users.length === 0).toBe(false);

                response.body.users.forEach((user) => {

                    expect(user).toHaveProperty("username", expect.any(String));
                    expect(user).toHaveProperty("name", expect.any(String));
                    expect(user).toHaveProperty("avatar_url", expect.any(String));
                });
            });
    });

    it("Should return the intended error message", () => {
        return request(app)
            .get("/api/mango")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Page not found");
            });
    });
})

describe("PATCH /api/articles/:article_id", () => {

    it("returns updated articles object", () => {
        return request(app)
            .patch("/api/articles/2")
            .expect(201)
            .send({
                inc_votes: -20,
            })
            .then(({ body }) => {
                const result = {
                    article_id: 2,
                    title: 'Sony Vaio; or, The Laptop',
                    topic: 'mitch',
                    author: 'icellusedkars',
                    body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                    created_at: '2020-10-16T05:03:00.000Z',
                    votes: -20
                };
                expect(body.updatedArticle).toEqual(result);
            });
    });
});

describe("GET /api/articles", () => {

    it("Should return an array of articles objects", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
                expect(response.body.result.length === 0).toBe(false);
                response.body.result.forEach((article) => {
                    expect(article).toHaveProperty("title", expect.any(String));
                    expect(article).toHaveProperty("topic", expect.any(String));
                    expect(article).toHaveProperty("author", expect.any(String));
                    expect(article).toHaveProperty("body", expect.any(String));
                    expect(article).toHaveProperty("created_at", expect.any(String));
                    expect(article).toHaveProperty("votes", expect.any(Number));
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

    it("Should return the array of articles object filtered by topic", () => {
        return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then((response) => {
                expect(response.body.result.length === 0).toBe(false);
                expect(response.body.result.every((article) => article.topic === 'mitch')).toBe(true);
            });
    });
});

describe("GET /api/articles/:article_id/comments", () => {

    it("Should return an array of comments for the given article_id", () => {
        return request(app)
            .get("/api/articles/5/comments")
            .expect(200)
            .then((response) => {
                expect(response.body.selectedComments.length === 0).toBe(false);
                expect(response.body.selectedComments.every((comment) => comment.article_id === 5)).toBe(true);
            });
    });
});
