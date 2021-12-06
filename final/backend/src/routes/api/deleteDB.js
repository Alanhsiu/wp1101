import Teacher from "../../models/teacher";

const deleteDB = async() => {
  try {
    await Teacher.deleteMany({});
    // console.log("Database cleared");
    return "Database cleared";
  } catch (e) {
    throw "Database clear failed";
  }
};

export default deleteDB;
