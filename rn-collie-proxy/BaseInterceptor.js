import MethodEntity from "./MethodEntity";

export default class BaseInterceptor {

    handle(args: Array): Promise {
        return new Promise((resolve) => {
            this.onHandle(new MethodEntity(args, resolve));
        });
    }

    onHandle(method: MethodEntity) {

    }
}
