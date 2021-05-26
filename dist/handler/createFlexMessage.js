"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlexMessage = void 0;
require("@line/bot-sdk");
const createFlexMessage = (type, data) => {
    const bubble = [];
    if (type === "meal") {
        data.forEach((doc) => {
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
    if (type === "restaurant") {
        data.forEach((doc) => {
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
                                {
                                    type: "icon",
                                    size: "sm",
                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                },
                                {
                                    type: "icon",
                                    size: "sm",
                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                },
                                {
                                    type: "icon",
                                    size: "sm",
                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                },
                                {
                                    type: "icon",
                                    size: "sm",
                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                                },
                                {
                                    type: "icon",
                                    size: "sm",
                                    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                                },
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
    const msg = {
        altText: "...",
        type: "flex",
        contents: {
            type: "carousel",
            contents: [...bubble],
        },
    };
    return msg;
};
exports.createFlexMessage = createFlexMessage;
//# sourceMappingURL=createFlexMessage.js.map