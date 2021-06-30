export default {
  port: 5000, // your port here
  host: "localhost", // your host here
  mongo_uri: "mongouri string",
  saltWorkFactor: 10, // add words to make harder to crack encryption
  accessTokenTtl: "15m", // lifetime of access token
  refreshTokenTtl: "1y", // lifetime of refresh token
  jwt_secret: `jwt secret string`, // jwt-secret
};
