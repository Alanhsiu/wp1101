import Teacher from "../../models/teacher";

const createResume = async (name, subject, price) => {
  try {
    const existing = await Teacher.findOne({ name, subject });
    await Teacher.findOneAndUpdate(
      { name, subject },
      { price },
      {
        new: true,
        upsert: true,
      }
    );
    console.log("Created Resume");
    return {
      message: `${
        existing ? "Updating" : "Adding"
      } (${name}, ${subject}, ${price})`,
      card: true,
    };
  } catch (e) {
    return { message: e, card: false };
  }
};

export default createResume;
