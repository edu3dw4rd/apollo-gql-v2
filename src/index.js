const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const typeDefs = require ('./schema');

const { createStore } = require('./utils');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const resolvers = require('./resolvers');
const testAuth = require('./testapo');

const store = createStore();
const isEmail = require('isemail');

const gateway = new ApolloGateway({
    buildService({ name, url }) {
        console.log("URL: ", url)
        return new testAuth(url)
    },
    serviceList: [
        { name: "user", url: "http://radiance:8080/gql/query"}
    ],
    debug: true
})

const server = new ApolloServer({ 
    // typeDefs,
    // resolvers,
    // context: async ({ req }) => {
    //     const auth = req.headers && req.headers.authorization || '';
    //     // const isAuthorized = false;
    //     // const email = Buffer.from(auth, 'base64').toString('ascii');
    //     // console.log("AUTH: ", auth)
    //     // if (!isEmail.validate(email)) return { user: null };
    //     // if (!isAuthorized) throw new Error("NO ACCESS");

    //     // const users = await store.users.findOrCreate({ where: { email } });
    //     // const user  = users && users[0] || null;

    //     // return { user: { ...user.dataValues } };
    //     return {auth};
    // },
    // dataSources: () => ({
    //     launchAPI: new LaunchAPI(),
    //     userAPI: new UserAPI({ store })
    // })
    gateway,
    subscriptions: false
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
})