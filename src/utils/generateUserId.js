import UserId from "@/models/UserId";
import connectDB from "./db";

export async function generateUserId() {
  await connectDB();

  // Find the current UserId
  const userIdRecord = await UserId.findOne({});
  
  let id;
  
  if (userIdRecord) {
    // If a record exists, increment the UserId
    id = userIdRecord.userId + 1;

    // Update the UserId in the database
    await UserId.updateOne({}, { userId: id }); // Make sure to use updateOne
  } else {
    // If no record exists, start with 1
    id = 1000;

    // Create the UserId record
    await UserId.create({ userId: id });
  }

  return id; // Returns the new UserId
}
