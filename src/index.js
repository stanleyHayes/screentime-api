const app = require("./app");
const  keys = require("./config/keys");

app.listen(keys.PORT, () => {
    console.log(`Connected to Server in ${keys.NODE_ENV} mode on port ${keys.PORT}`);
});
