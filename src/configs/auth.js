module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "JAYSON",
    expiresIn: "1d"
  }
}