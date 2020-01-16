import _Time from "./_Time";
import Variable from "../../config/Variable";

/**
 * 防抖修饰器
 * 在方法上面加上@debounce即可
 * @returns {function(...[*]=)}
 */
export default function (target, key, descriptor) {
    return {
        ...descriptor,
        configurable: true,
        value() {
            if (_Time.getTimeDiff() >= Variable.click_filter_time) {
                _Time.update();
                return descriptor.value.apply(this, arguments)
            }
        }
    }
}
