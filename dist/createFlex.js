"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlex = void 0;
require("@line/bot-sdk");
const createFlex = (name) => {
    const obj = {
        altText: "",
        type: "flex",
        contents: {
            type: "bubble",
            hero: {
                type: "image",
                url: "https://picsum.photos/600/400",
                size: "full",
                aspectRatio: "3:2",
                aspectMode: "cover",
                action: {
                    label: "img",
                    type: "uri",
                    uri: "http://google.com/",
                },
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: name,
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
                                text: "4.0",
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
                                        text: "Place",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                                        wrap: true,
                                        color: "#666666",
                                        size: "sm",
                                        flex: 5,
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
                                        text: "Time",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: "10:00 - 23:00",
                                        wrap: true,
                                        color: "#666666",
                                        size: "sm",
                                        flex: 5,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                    {
                        type: "button",
                        style: "link",
                        height: "sm",
                        action: {
                            type: "uri",
                            label: "CALL",
                            uri: "https://google.com",
                        },
                    },
                    {
                        type: "button",
                        style: "link",
                        height: "sm",
                        action: {
                            type: "uri",
                            label: "WEBSITE",
                            uri: "https://google.com",
                        },
                    },
                    {
                        type: "spacer",
                        size: "sm",
                    },
                ],
                flex: 0,
            },
        },
    };
    return obj;
};
exports.createFlex = createFlex;
//# sourceMappingURL=createFlex.js.map