import AdminSchema from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AdminService {
  async adminRegister(name, password) {
    const isUsed = await AdminSchema.findOne({ name });

    if (isUsed) {
      throw new Error("Username is taken");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new AdminSchema({
      name,
      password: hash,
    });

    await newUser.save();
    return newUser;
  }

  async adminLogin(name, password) {
    const user = await AdminSchema.findOne({ name });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
      // {expiresIn:"30d"}
    );

    return { token, user, message: "You are logged in" };
  }
}
export default new AdminService();
