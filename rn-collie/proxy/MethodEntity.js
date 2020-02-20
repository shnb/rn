export default class MethodEntity {

    resolve: (result: Promise<boolean> | boolean) => void;
    args: Array<any> = null;

    constructor(args: Array<any>, resolve: (result: Promise<boolean> | boolean) => void) {
        this.args = args;
        this.resolve = resolve;
    }

    /**
     * 执行方法
     */
    invoke() {
        this.resolve(false);
    }

    /**
     * 取消方法执行
     */
    cancel() {
        this.resolve(true);
    }
}
