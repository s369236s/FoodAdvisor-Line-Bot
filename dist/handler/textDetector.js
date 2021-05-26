"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textDetector = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const textDetector = async (Usertext) => {
    if (Usertext.match(/餐點/)) {
        const str = Usertext.replace(/的餐點|餐點/, "");
        console.log(str);
        const foundRestaurants = await firebaseConfig_1.db
            .collection("restaurants")
            .where("name", "==", str)
            .get();
        if (foundRestaurants.empty) {
            const returnData = {
                ok: false,
                message: "restaurant not found",
                errMessage: `未找到${Usertext}`,
            };
            return returnData;
        }
        let restaurantId = "";
        foundRestaurants.forEach((doc) => (restaurantId = doc.id));
        const meals = await firebaseConfig_1.db
            .collection("food")
            .where("resaurantId", "==", restaurantId)
            .get();
        meals.forEach((doc) => {
            console.log("\x1b[37m", doc.data());
        });
        const returnData = {
            ok: true,
            message: "found meals",
            type: "meal",
            foundData: meals,
        };
        return returnData;
    }
    const type = await firebaseConfig_1.db
        .collection("foodTypes")
        .where("name", "==", Usertext)
        .get();
    if (!type.empty) {
        const foundRestaurants = await firebaseConfig_1.db
            .collection("restaurants")
            .where("type", "==", Usertext)
            .orderBy("review", "desc")
            .limit(5)
            .get();
        const returnData = {
            ok: true,
            message: "found restaurant",
            type: "restaurant",
            foundData: foundRestaurants,
        };
        return returnData;
    }
    const restaurants = await firebaseConfig_1.db
        .collection("restaurants")
        .where("name", "==", Usertext)
        .get();
    if (!restaurants.empty) {
        const foundRestaurants = await firebaseConfig_1.db
            .collection("restaurants")
            .where("name", "==", Usertext)
            .orderBy("review", "asc")
            .limit(5)
            .get();
        const returnData = {
            ok: true,
            message: "found restaurant",
            type: "restaurant",
            foundData: foundRestaurants,
        };
        return returnData;
    }
    const returnData = {
        ok: false,
        message: "text not matched",
        errMessage: "看不懂你說什麼",
    };
    return returnData;
};
exports.textDetector = textDetector;
//# sourceMappingURL=textDetector.js.map