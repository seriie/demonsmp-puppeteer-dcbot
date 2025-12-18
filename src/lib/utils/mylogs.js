export function mylogs(icon, text) {
    const date = new Date.now().toString();

    return `[${date}] ${icon}  ${text}`;
}