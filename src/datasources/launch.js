const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        // this.baseURL = 'https://api.spacexdata.com/v2/';
        // this.baseURL = 'http://api.btp.kemdikbud.loc/';
        this.baseURL = 'http://satanic';

    }

    /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
    // initialize(config) {
    //     console.log("CONF: ", config)
    //     this.context = config.context;
    // }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.auth);
    }

    async getAllLaunches() {
        const response = await this.get('launches');
        return Array.isArray(response)
            ? response.map(launch => this.launchReducer(launch))
            : [];
    }

    launchReducer(launch) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
        }
    }

    bookReducer(book) {
        return {
            id: book.id,
            isbn: book.isbn || "-",
            title: book.title || "-",
            school_classes: {
                id: book.school_class.id,
                class: book.school_class.class || "-",
            }
        }
    }

    companyReducer(company) {
        return {
            id: company.id,
            name: company.name || "-",
            store_name: company.store_name || "-",
            store_slug: company.store_slug || "",
            pic_name: company.pic_name || "-",
            pic_title: company.pic_title || "-",
            pic_email: company.pic_email || "-",
        }
    }

    async getLaunchById({launchId}) {
        const response = await this.get('launches', { flight_number: launchId });
        return this.launchReducer(response[0]);
    }

    getLaunchByIds({ launchIds }) {
        return Promise.all(
            launchIds.map(launchId => this.getLaunchById({ launchId })),
        )
    }

    async getBooks() {
        const response = await this.get('/buku/book/list');
        console.log("RESP: ", response.data);
        return Array.isArray(response.data)
            ? response.data.map((books) => 
                console.log("BOOKS: ", books),
                this.bookReducer(books)
                )
            : [];
    }

    async getCompanies(conditions) {
        console.log("CONDITIONS: ", conditions)
        const response = await this.get('/users/company', { q: conditions.conditions } );
        // console.log("RESP: ", response.data);
        return Array.isArray(response.data.items)
            ? response.data.items.map((company) =>
                this.companyReducer(company)
            )
            : [];
    }
}

module.exports = LaunchAPI;