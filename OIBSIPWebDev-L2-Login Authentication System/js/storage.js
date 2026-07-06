/* ==========================================
   STORAGE MODULE
========================================== */

const STORAGE_KEY = "users";

function getUsers() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

function saveUsers(users) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(users)
    );

}

function usernameExists(username) {

    const users = getUsers();

    return users.some(user =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    );

}

function emailExists(email) {

    const users = getUsers();

    return users.some(user =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

}

function findUser(identifier) {

    const users = getUsers();

    return users.find(user =>

        user.username.toLowerCase() === identifier.toLowerCase()

        ||

        user.email.toLowerCase() === identifier.toLowerCase()

    );

}