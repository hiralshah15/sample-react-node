import moment from "moment";

const location = window.location;

// eslint-disable-line

export function findChannelIndex(newChannel, channels) {
    const newChannelLastMessageUpdated = newChannel.lastMessage
        ? newChannel.lastMessage.createdAt
        : newChannel.createdAt;

    let index = channels.length;
    for (let i = 0; i < channels.length; i++) {
        const comparedChannel = channels[i];
        const comparedChannelLastMessageUpdated = comparedChannel.lastMessage
            ? comparedChannel.lastMessage.createdAt
            : comparedChannel.createdAt;
        if (newChannel.url === comparedChannel.url) {
            index = i;
            break;
        } else if (
            newChannelLastMessageUpdated > comparedChannelLastMessageUpdated
        ) {
            index = i;
            break;
        }
    }
    return index;
}

export function findMessageIndex(newMessage, messages, isRequestId = false) {
    let index = messages.length;
    for (let i = 0; i < messages.length; i++) {
        if (
            !isRequestId &&
            newMessage.messageId !== 0 &&
            messages[i].messageId !== 0 &&
            messages[i].messageId === newMessage.messageId
        ) {
            index = i;
            break;
        } else if (isRequestId && messages[i].reqId === newMessage.reqId) {
            index = i;
            break;
        } else if (messages[i].createdAt >= newMessage.createdAt) {
            index = i;
            break;
        }
    }
    return index;
}

export function mergeFailedWithSuccessful(failedMessages, successfulMessages) {
    const wholeMessages = [...successfulMessages];
    for (let i = 0; i < failedMessages.length; i++) {
        const index = findMessageIndex(failedMessages[i], wholeMessages);
        wholeMessages.splice(index, 0, failedMessages[i]);
    }
    return wholeMessages;
}

export const timestampToTime = (timestamp) => {
    const now = new Date().getTime();
    const nowDate = moment
        .unix(now.toString().length === 13 ? now / 1000 : now)
        .format("MM/DD");

    let date = moment
        .unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp)
        .format("MM/DD");
    if (date === "Invalid date") {
        date = "";
    }

    return nowDate === date
        ? moment
              .unix(
                  timestamp.toString().length === 13
                      ? timestamp / 1000
                      : timestamp
              )
              .format("HH:mm")
        : date;
};

export const timestampToDateString = (timestamp) => {
    return moment
        .unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp)
        .format("LL");
};

export const timestampFromNow = (timestamp) => {
    moment.locale("en", {
        relativeTime: {
            future: "in %s",
            past: function (input) {
                return input === "Just Now" ? input : input + " ago";
            },
            s: "Just Now",
            ss: "Just Now",
            m: "Just Now",
            mm: "%dm",
            h: "an hour",
            hh: "%dh",
            d: "a day",
            dd: "%dd",
            M: "a month",
            MM: "%dM",
            y: "a year",
            yy: "%dY",
        },
    });
    return moment(timestamp).fromNow();
};

export const isUrl = (urlString) => {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(urlString);
};

export const isImage = (fileType) => {
    const regex = /^image\/.+$/;
    return regex.test(fileType);
};

export const isEmpty = (value) => {
    return value === null || value === undefined || value.length === 0;
};

export const isNull = (value) => {
    try {
        return value === null;
    } catch (e) {
        return false;
    }
};

export const setCookie = (key, value) => {
    document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const getCookie = (key) => {
    let name = `${key}=`;
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        if (!c) continue;
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const getVariableFromUrl = () => {
    let vars = {};
    let hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (let i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split("=");
        vars[hash[0]] = hash[1];
    }
    return vars;
};

export const errorAlert = (message, reload = false) => {
    // alert(message);
    // eslint-disable-next-line no-console
    console.error(message);
    if (reload) {
        location.reload(true);
    }
};

export const redirectToIndex = (message) => {
    if (message) {
        errorAlert(message, false);
    }
    window.location.href = "index.html";
};

export const setDataInElement = (target, key, data) => {
    target.dataset[`${key}`] = data;
};

export const getDataInElement = (target, key) => {
    return target.dataset[`${key}`];
};

export const createDivEl = ({ id, className, content, background }) => {
    const el = document.createElement("div");
    if (id) {
        el.id = id;
    }
    if (className) {
        el.className = Array.isArray(className)
            ? className.join(" ")
            : className;
    }
    if (content) {
        el.innerHTML = content;
    }
    if (background) {
        el.style.backgroundImage = `url(${background})`;
    }
    return el;
};

export const isScrollBottom = (target) => {
    return target.scrollTop + target.offsetHeight >= target.scrollHeight;
};

export const appendToFirst = (target, newElement) => {
    if (target.childNodes.length > 0) {
        target.insertBefore(newElement, target.childNodes[0]);
    } else {
        target.appendChild(newElement);
    }
};

const hasClass = (target, className) => {
    return target.classList
        ? target.classList.contains(className)
        : new RegExp("(^| )" + className + "( |$)", "gi").test(
              target.className
          );
};

export const addClass = (target, className) => {
    if (target.classList) {
        if (!(className in target.classList)) {
            target.classList.add(className);
        }
    } else {
        if (target.className.indexOf(className) < 0) {
            target.className += ` ${className}`;
        }
    }
};

export const removeClass = (target, className) => {
    if (target.classList) {
        target.classList.remove(className);
    } else {
        target.className = target.className.replace(
            new RegExp(
                "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                "gi"
            ),
            ""
        );
    }
};

export const toggleClass = (target, className) => {
    hasClass(target, className)
        ? removeClass(target, className)
        : addClass(target, className);
};

export const uuid4 = () => {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};

export const protectFromXSS = (text) => {
    return typeof text === "string"
        ? text
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&apos;")
        : text;
};
export const randomNumber = (number) => {
    return moment().toDate().getTime() + "_" + number;
};

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
