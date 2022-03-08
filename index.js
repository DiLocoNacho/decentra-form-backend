require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// MongoDB & Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

// Setup uses
app.use(cors());
app.use(express.json());

// Import API Routes
app.use(`/form`, require("./routes/form"));

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
