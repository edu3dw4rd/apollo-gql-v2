const { RemoteGraphQLDataSource } = require('@apollo/gateway');

class Authentication extends RemoteGraphQLDataSource{
    willSendRequest({ request, context }) {
        console.log("REQUEST: ", request)
        console.log("CONTEXT: ", context)
        request.http.headers.set('authorization', 'eyJ0eXAiOiJhcHAiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXN0ZW0iLCJhdXRoIjoiUk9MRV9BUFBMSUNBVElPTiIsImV4cCI6MzEyMjQyNzY3NX0.3fSbi6lMgomBSuehP1u-MWmyaUJ9uf6HOAIHe2X0Xz2nR45ptDmqbAnLWcuXJ9XSpzgPqL6jXBC3sJUrRDdTfQ')
    }
}

module.exports = Authentication