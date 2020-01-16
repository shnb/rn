export default class _Time {
    static time = 0;

    static update() {
        this.time = new Date().getTime();
    }

    static getTimeDiff() {
        return new Date().getTime() - this.time;
    }
}
