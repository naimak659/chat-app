import { getDatabase, ref, set } from "firebase/database";

function db(database, info) {
  const db = getDatabase();
  const usersRef = ref(db, database);
  set(push(usersRef, info));
}
