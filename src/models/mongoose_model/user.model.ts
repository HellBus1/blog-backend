import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// User for registration
UserSchema.pre("save", async function (next) {
  const { SALT_WORK_FACTOR } = process.env;

  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(+SALT_WORK_FACTOR);

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
})

// Used for logging in
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((err) => {
    console.log(err)
    return false
  });
}

const UserModel = mongoose.model<UserDocument>("User", UserSchema, "users")

export { UserDocument, UserModel };