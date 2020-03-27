const { gql } = require('apollo-server');

const typeDefs = gql`
    # GraphQL Schema Goes Here
    # Launches without pagination
    #type Query {
    #    launches: [Launch]!
    #    launch(id: ID!): Launch
    #    # Queries for the current user
    #    me: User
    #}

    type Query {
        launches (
            """
            The number of results to show. Must be >= 1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): LaunchConnection!

        books: [Book]!

        launch(id: ID!): Launch
        # Queries for the current user
        me: User

        companies (
            conditions: String
        ): [Company]!
    }

    type Book {
        id: ID!
        isbn: String
        title: String
        schoolClass: SchoolClass
    }

    type Company {
        id: ID!
        name: String
        storeName: String
        storeSlug: String
        picName: String
        picTitle: String
        picEmail: String
    }

    type SchoolClass {
        id: ID!
        class: String
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission    # Mission is an object type
        rocket: Rocket    # Rocket is an object type
        isBooked: Boolean!
    }

    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        totalItems: Int!
        launches: [Launch]!
    }

    # Defining an object type 'Rocket'
    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mission {
        name: String
        missionPatch(mission: String, size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type Mutation {
        # if false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!

        # if false, cancellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!

        login(email: String): String # login tokin
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
`;

module.exports = typeDefs