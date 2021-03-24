import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  //   static APItoken;

  static async request(endpoint, data = {}, method = "get", APItoken) {
    console.debug("API Call:", endpoint, data, method, APItoken);

    const url = `${BASE_URL}/${endpoint}`;

    // console.log(APItoken);
    const headers = {
      Authorization: `Bearer ${APItoken}`,
    };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //*** COMPANY ROUTES ***//

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Get all companies, returns list of company objects
  static async getAllCompanies() {
    let res = await this.request(`companies`);

    return res.companies;
  }

  //   // Add a new company. Takes a company object as input and returns the new company object
  //   static async addCompany(data) {
  //     let res = await this.request(`companies`, data, "POST");
  //     return res.company;
  //   }

  //   // Update a company, given its handle, and data to change.
  //   // returns updated company object if successful
  //   static async updateCompany(handle, data) {
  //     let res = await this.request(`companies/${handle}`, (data = data), "PATCH");

  //     return res.company;
  //   }

  //   // Delete a company, given its handle
  //   static async deleteCompany(handle) {
  //     let res = await this.request(`companies/${handle}`, "DELETE");
  //   }

  static async filterCompanies(name) {
    let res = await this.request(`companies?name=${name}`);
    return res.companies;
  }

  // ***** JOB ROUTES ********
  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // ****** USER ROUTES******
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    this.APItoken = res.token;
    return res.token;
  }

  static async userInfo(username, token) {
    // console.log(`WE ARE AT THE API.JS; TOKEN IS: ${token}`);
    let res = await this.request(`users/${username}`, {}, "GET", token);
    return res.user;
  }

  static async updateUser(username, data, token) {
    let res = await this.request(`users/${username}`, data, "PATCH", token);
    return res.user;
  }

  static async apply(username, jobId, token) {
    try {
      let res = await this.request(
        `users/${username}/jobs/${jobId}`,
        {},
        "POST",
        token
      );
      return res.applied;
    } catch (e) {
      console.log(e);
    }
  }

  static async login(data) {
    let res = await this.request("auth/token", data, "POST");
    this.APItoken = res.token;
    return res.token;
  }

  static async logout() {
    // this.APItoken =
    this.APItoken = "";
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
    console.log("Logout");
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.APItoken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
