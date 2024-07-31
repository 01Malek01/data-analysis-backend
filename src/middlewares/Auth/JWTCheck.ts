import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "Data-Analysis-App-api",
  issuerBaseURL: "https://dev-cexu7h8s3dde5fb4.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
