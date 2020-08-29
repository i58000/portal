export default (str: string): string => {
    if (!str) return 'unknown';
    const date = new Date(str);
    return date.toLocaleDateString() + ' ' + date.toTimeString().substr(0, 5);
}