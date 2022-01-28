export function getUsers() {
    return fetch('https://randomuser.me/api/?results=100')
        .then(response => response.json());
}