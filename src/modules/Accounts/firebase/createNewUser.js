import { createDbOperatorObject } from "./createDbOperatorObject";
import { createNewAuth } from "./createNewAuth";

export const createNewUser = async (values, admins) => {
  try {
    const newUser = await createNewAuth(values.email, values.pass);
    createDbOperatorObject(admins, values, newUser )
  } catch(e) {
    console.log(e)
    throw e
  }
};
