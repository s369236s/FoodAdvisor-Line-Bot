"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlex = void 0;
require("@line/bot-sdk");
const createFlex = (prop) => {
    const flexContents = [];
    for (const i in prop) {
        const tmp = calStar(prop[i].review);
        const data = {
            type: "bubble",
            hero: {
                type: "image",
                url: prop[i].url,
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
                        text: prop[i].name,
                        weight: "bold",
                        size: "xl",
                    },
                    {
                        type: "box",
                        layout: "baseline",
                        margin: "md",
                        contents: [
                            ...tmp.fullStar,
                            ...tmp.emptyStar,
                            {
                                type: "text",
                                text: prop[i].review.toString(),
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
                                        text: prop[i].address,
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
                                        text: "Phone",
                                        color: "#aaaaaa",
                                        size: "sm",
                                        flex: 1,
                                    },
                                    {
                                        type: "text",
                                        text: prop[i].phone,
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
        };
        flexContents.push(data);
    }
    const obj = {
        altText: "不支援",
        type: "flex",
        contents: {
            type: "carousel",
            contents: flexContents,
        },
    };
    return obj;
};
exports.createFlex = createFlex;
const calStar = (stars) => {
    const emptyStar = [];
    const fullStar = [];
    for (let i = 0; i < Math.floor(stars); i++) {
        fullStar.push({
            type: "icon",
            size: "sm",
            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
        });
    }
    for (let i = 0; i < 5 - Math.floor(stars); i++) {
        fullStar.push({
            type: "icon",
            size: "sm",
            url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
        });
    }
    return { emptyStar, fullStar };
};
//# sourceMappingURL=createFlex.js.map