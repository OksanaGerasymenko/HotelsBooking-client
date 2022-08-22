export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getRandomAvatar() {
    return (
        `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
        )
        .toString(36)
        .substring(7)}.svg`
    );
}
