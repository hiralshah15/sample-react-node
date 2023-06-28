const request = require("request");

let authToken =
    "djIuY2Y4YzM0MmY2MjU5NGQ2YzlhNmQ5MzcxYjhhZWQxMjAuYzM0MmFiYWZjYmMzMmU0YTIyZTI0MzgyNzVjMjNiNDNlNjhlYzExYTYzZWVmNGNjZjVkNWY1MDUyZDA0MDNkZjo=";
const api = (endpoint, formData) => {
    const options = {
        url: `https://api.truevault.com${endpoint}`,
        formData,
    };
    if (authToken) {
        options.headers = {
            Authorization: `Basic ${authToken}`,
        };
    }
    console.log(options);
    return new Promise((resolve, reject) => {
        request.get(options, (err, response, body) => {
            if (err) return reject(err);
            return resolve(JSON.parse(body));
        });
    });
};

const login = async () => {
    const formData = {
        username: "admin",
        password: "Rey12345678",
        account_id: "f1ebe4c7-e81f-4b22-96d5-7640171bd41c",
    };
    const { user } = await api("/auth/login", formData);

    console.log(user);
    authToken = Buffer.from(user.access_token).toString("base64");
    return user;
};
const search = () => {
    const ids = ["697d7b55-74c9-480d-97b7-381a7c3e1ef0"];

    return api(
        `/v2/vaults/5ea6d66f-db8f-46eb-993f-db5030f22cd8/documents/${ids.join(
            ","
        )}`
    );
};

search().then((users) => {
    console.log(users);
});
