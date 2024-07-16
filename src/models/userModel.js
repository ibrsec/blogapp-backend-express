const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is a required field!"],
      unique: [true, "Same username is exist in the users table!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is a required field!"],
      unique: [true, "Same email is exist in the users table!"],
      validate: (data) => {
        
        if (!data.includes("@") || !data.includes(".")) {
          // @ and . inlcude?
          return false;
        } else if (data.slice(0, data.indexOf("@")).length < 1) {
          // **@
          return false;
        } else if (
          // @**.
          
          data.slice(
            data.indexOf("@"),
            data.indexOf(".", data.indexOf("@"))
          ).length < 2
        ) {

          return false;
        } else if (
          data.slice(data.indexOf(".", data.indexOf("@"))).length < 2
        ) {
          // @.**
          return false;
        } else {
          // valid email
          return true;
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is a required field!"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports.User = mongoose.model("User", userSchema);
