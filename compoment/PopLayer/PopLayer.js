import Layer from "../Layer/Layer";
import PopLayerView from "./PopLayerView";

/**
 * Pop的基础操作类
 */
export default class PopLayer extends Layer {
    static View = PopLayerView;

    /**
     * 测量锚点view的布局信息
     * @param anchorView 锚点view
     * @returns {Promise<R>}
     */
    static async measure(anchorView) {
        return await new Promise((resolve, reject) => {
            anchorView.measure((x, y, width, height, pageX, pageY) => {
                if (width !== 0) {
                    resolve({width, height, x: pageX, y: pageY});
                } else {
                    reject('error');
                }
            })
        });
    }
}
