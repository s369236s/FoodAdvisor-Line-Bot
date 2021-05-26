import { db } from "../config/firebaseConfig";

//For returning to replyHandler data
export interface ReturnData {
  ok: boolean;
  message: string;
  errMessage?: string;
  type?: string;
  foundData?: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;
}

export const textDetector = async (Usertext: string) => {
  //Check userText is contained meal word
  if (Usertext.match(/餐點/)) {
    //Make userText only restaurant name
    const str = Usertext.replace(/的餐點|餐點/, "");

    //Check Restaurnt is existed
    const foundRestaurants = await db
      .collection("restaurants")
      .where("name", "==", str)
      .get();

    if (foundRestaurants.empty) {
      const returnData: ReturnData = {
        ok: false,
        message: "restaurant not found",
        errMessage: `未找到${Usertext}`,
      };
      return returnData;
    }

    let restaurantId = "";
    foundRestaurants.forEach((doc) => (restaurantId = doc.id));

    //Find restaurant food
    const meals = await db
      .collection("food")
      .where("resaurantId", "==", restaurantId)
      .get();

    meals.forEach((doc) => {
      console.log("\x1b[37m", doc.data());
    });

    //return found meals
    const returnData: ReturnData = {
      ok: true,
      message: "found meals",
      type: "meal",
      foundData: meals,
    };

    return returnData;
  }

  //Check user is searching for food type or restaurant
  const type = await db
    .collection("foodTypes")
    .where("name", "==", Usertext)
    .get();
  //found type
  if (!type.empty) {
    //Grab top 5 restaurant
    const foundRestaurants = await db
      .collection("restaurants")
      .where("type", "==", Usertext)
      .orderBy("review", "desc")
      .limit(5)
      .get();
    const returnData: ReturnData = {
      ok: true,
      message: "found restaurant",
      type: "restaurant",
      foundData: foundRestaurants,
    };
    return returnData;
  }
  const restaurants = await db
    .collection("restaurants")
    .where("name", "==", Usertext)
    .get();
  if (!restaurants.empty) {
    //Grab top 5 restaurant
    const foundRestaurants = await db
      .collection("restaurants")
      .where("name", "==", Usertext)
      .orderBy("review", "asc")
      .limit(5)
      .get();
    const returnData: ReturnData = {
      ok: true,
      message: "found restaurant",
      type: "restaurant",
      foundData: foundRestaurants,
    };
    return returnData;
  }
  //Unhandlable text
  const returnData: ReturnData = {
    ok: false,
    message: "text not matched",
    errMessage:
      "無法辨識輸入，提示：可以輸入 ✔ 臭豆腐、 ✔ 雞排、 ✔燒臘等食物類型😊",
  };
  return returnData;
};
