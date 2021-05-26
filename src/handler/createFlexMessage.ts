import { FlexBubble, FlexComponent, FlexMessage } from "@line/bot-sdk";

//Restaurant data
interface RestaurantProp {
  name: string;
  review: number;
  address: string;
  phone: string;
  imageUrl: string;
}
//Meal data
interface MealProp {
  name: string;
  price: string;
  imageUrl: string;
}

//create flex message
export const createFlexMessage = (type: string | undefined, data: any[]) => {
  const bubble: FlexBubble[] = [];
  //check meal data type
  if (type === "meal") {
    data.forEach((doc: MealProp) => {
      bubble.push({
        type: "bubble",
        size: "micro",
        hero: {
          type: "image",
          url: doc.imageUrl,
          size: "full",
          aspectMode: "cover",
          aspectRatio: "4:3",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: doc.name,
              weight: "bold",
              size: "sm",
              wrap: true,
            },
            {
              type: "text",
              color: "#8c8c8c",
              text: `價格 $${doc.price}`,
              size: "sm",
              wrap: true,
            },
          ],
          spacing: "sm",
          paddingAll: "13px",
          justifyContent: "space-evenly",
        },
      });
    });
  }
  //check restaurant data type
  if (type === "restaurant") {
    data.forEach((doc: RestaurantProp) => {
      //create star flex components
      const { emptyStar, fullStar } = calStar(doc.review);
      bubble.push({
        type: "bubble",
        size: "mega",
        hero: {
          type: "image",
          url: doc.imageUrl,
          size: "full",
          aspectRatio: "4:3",
          aspectMode: "cover",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: doc.name,
              weight: "bold",
              size: "xl",
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                ...fullStar,
                ...emptyStar,
                {
                  type: "text",
                  text: doc.review.toString(),
                  size: "sm",
                  color: "#999999",
                  margin: "md",
                  flex: 0,
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "地址",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 2,
                    },
                    {
                      type: "text",
                      text: doc.address,
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 6,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "連絡電話",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 2,
                    },
                    {
                      type: "text",
                      text: doc.phone,
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 6,
                    },
                  ],
                },
              ],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "horizontal",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "vertical",
              cornerRadius: "7px",
              backgroundColor: "#242a36",
              contents: [
                {
                  type: "button",
                  style: "link",
                  height: "sm",
                  color: "#ffffff",
                  action: {
                    type: "uri",
                    label: "撥打電話",
                    uri: `tel:${doc.phone.replace(/\s*/g, "")}`,
                    altUri: {
                      desktop: "https://www.google.com/",
                    },
                  },
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              backgroundColor: "#ffc300",
              margin: "md",
              cornerRadius: "7px",
              contents: [
                {
                  type: "button",
                  style: "link",
                  color: "#000000",
                  height: "sm",
                  action: {
                    type: "message",
                    label: "看餐點",
                    text: `${doc.name}的餐點`,
                  },
                },
              ],
            },

            {
              type: "spacer",
              size: "sm",
            },
          ],
          flex: 0,
        },
      });
    });
  }

  //create carousel message
  const msg: FlexMessage = {
    altText: "...",
    type: "flex",
    contents: {
      type: "carousel",
      //using spread syntax instead puting a array varible because It's more readable and scalable
      contents: [...bubble],
    },
  };
  return msg;
};

const calStar = (review: number) => {
  const fullStar: FlexComponent[] = [];
  const emptyStar: FlexComponent[] = [];
  //creating full star with default Line star image
  for (let i = 0; i < Math.floor(review); i++) {
    fullStar.push({
      type: "icon",
      size: "sm",
      url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
    });
  }
  for (let i = 0; i < 5 - Math.floor(review); i++) {
    //creating empty star with default Line star image
    emptyStar.push({
      type: "icon",
      size: "sm",
      url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
    });
  }
  return { fullStar, emptyStar };
};
