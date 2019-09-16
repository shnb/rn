# 组件库Collie

git地址:git@172.31.13.131:mobile_rn/Collie.git

工程为纯rn项目,可直接运行,详细UI可运行后查看

**组件列表如下**

- <a href="#Button">Button</a>

- <a href="#CheckBox">CheckBox</a>

- <a href="#Dialog">Dialog</a>

- <a href="#DialogList">DialogList</a>

- <a href="#UpdateDialog">UpdateDialog 检查更新弹窗</a>

- <a href="#GridLayout">GridLayout</a>

- <a href="#Label">Label</a>

- <a href="#Layer">Layer</a>

- <a href="#Loading">Loading</a>

- MoneyTextInput

- BasePage

- BaseListPage

- CityPicker

- DatePicker

- HoursPicker

- SinglePicker

- PopLayer

- PopMenu

- RefreshListView

- SearchBar

- Space

- SplitLine

- StackLayout

- StatusImage

- StatusView

- Toast

- ToolBar

- Timer

### <a name="Button">Button</a>

使用方法

```jsx
<Button text='我是按钮'/>
```

属性列表

| 属性名              | 类型              | 介绍                   |
|:---------------- | --------------- | -------------------- |
| backgroundColor? | string          | 背景颜色                 |
| style            | Object          | 按钮的style,同view的style |
| onPress          | Function        | 点击事件                 |
| textStyle?       | Object          | 文字的style             |
| text             | string          | 按钮的文本                |
| bRef?            | string或Function | 真正的ref               |

### <a name="CheckBox">CheckBox</a>

使用方法

```jsx
<CheckBox
label='去吃饭吗,小伙'
check={this.state.check}
onCheckChange={(check) => {                                              
    this.setState({check:!this.state.check});
    Toast.message(check ? '选中了' : '没选中');
}}/>  
```

属性列表

| 属性名            | 类型       | 介绍                          |
|:-------------- | -------- | --------------------------- |
| style?         | Object   | 同view的style                 |
| labelStyle?    | Object   | 文字的style,同TextView的style    |
| label          | string   | 显示的文本                       |
| imageStyle?    | Object   | icon的style,同imageView的style |
| activeColor?   | string   | 激活下文字颜色                     |
| inActiveColor? | string   | 非激活下文字颜色                    |
| activeImage?   | any      | 激活下的图片                      |
| inActiveImage? | any      | 非激活下的图片                     |
| check          | boolean  | check的状态                    |
| onCheckChange  | Function | 当check变化的回调                 |
| enable?        | boolean  | 是否可用                        |
| disableColor?  | string   | 不可用下的字体和图片的颜色               |

### <a name="Dialog">Dialog</a>

支持标题,内容,任意数量的按钮,风格统一的dialog组件,
此组件依赖Layer组件

使用方法

```jsx
Dialog.show('我是弹窗', 
            '我时一个弹窗,使用的是时候只需Dialog.show(),show方法需要标题,内容,任意个按钮,试试看吧',
            [{text: '不懂', onClick: () => {Toast.message('你真笨')}},
             {text: '有点懂',onClick: () => {Toast.message('你靠谱')}},
             {text: '明白了',onClick: () => {Toast.message('你很棒')}}],
);
```

属性列表

| 属性名类型介绍  |                                                                            |             |
| -------- | -------------------------------------------------------------------------- | ----------- |
| title?   | string                                                                     | 标题          |
| content  | string                                                                     | 内容文本        |
| buttons  | Array<{ text: string, style?: {}, onClick: Function }>                     | 按钮的数组       |
| options? | { dialogStyle?: {}, titleStyle?: {}, contentStyle?: {}, buttonStyle?: {} } | dialog的其他属性 |

### <a name="DialogList">DialogList</a>

列表形式的dialog,点击列表项弹窗消失

此组件依赖于Layer组件

使用方法

```jsx
DialogList.show(['python', 'ruby', 'java', 'c++', 'php', 'kotlin', 'dart'],
                 (index, value) => Toast.message(value));
```

属性列表

| 属性名             | 类型                                    | 介绍       |
| --------------- | ------------------------------------- | -------- |
| list            | Array<string>                         | 数据源列表    |
| onClick         | Function<{index:number,value:string}> | 列表项的点击事件 |
| Function->index | number                                | 列表项的序号   |
| Function->value | value:string                          | 列表项的值    |

### <a name="UpdateDialog">UpdateDialog</a>

检查更新组件,具体UI样式请运行项目查看
此组件依赖Layer组件

使用方法

```jsx
UpdateDialog.show('v1.1.2',
                  true,
                  ['功能优化1', '功能优化2', '功能优化3', '功能优化4'],
                  () => {
                       Toast.message('开始更新拉');
                  });
```

属性列表

| 属性                  | 类型                                         | 介绍                              |
| ------------------- | ------------------------------------------ | ------------------------------- |
| version             | string                                     | 版本号                             |
| force               | string                                     | 是否强制更新                          |
| infos               | Array<string>                              | 更新项的列表                          |
| onUpdateClick       | Function                                   | 点击立即更新的回调                       |
| style?              | { primaryColor: string, headerImage: any } | 组件的样式                           |
| style->primaryColor | string                                     | 组件的主格调的颜色                       |
| style->headerImage  | any                                        | 组件头部banner的图片,同ImageView的source |

### <a name="GridLayout">GridLayout</a>

网格容器布局组件,渲染任意列的网格

使用方法

```jsx
renderGridCell(){
let colors = utils.getRGBArray(10);
return utils.range(11).map((_, i,) => {
    return (<View
                key={i}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors[i],
                }}>
                <Text>cell</Text>
            </View>)
    })
}
render(){
  return (<GridLayout colNum={4}>
     {this.renderGridCell()}
   </GridLayout>)
}
```

属性列表

| 属性     | 类型     | 介绍                |
| ------ | ------ | ----------------- |
| style  | Object | 组件的样式,同view的style |
| colNum | number | 列数                |
| width  | number | 组件的宽度             |

### <a name="Label">Label</a>

显示一个标签,具备placeHolder功能的TextView

使用方式

```jsx
<Label
    style={{
        width: 200,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        textAlign: 'center',

    }}
    placeHolder='我是placeholder text'
    value={this.state.placeHolderTextValue}/>
```

属性列表

| 属性                  | 类型     | 介绍                   |
| ------------------- | ------ | -------------------- |
| placeHolder?        | string | 无文本时的替换文本            |
| placeHolderColor?   | string | 替换文本的颜色              |
| placeHolderFontSize | string | 替换文本的字体大小            |
| fontSize?           | number | 字体的大小                |
| value               | string | 显示的文本                |
| color?              | string | 字体的颜色                |
| style?              | string | 组件的style,同Text的style |

### <a name="Layer">Layer</a>

Layer是所有弹窗的组件的基础
由三个文件组成
分别为Layer,LayerManager,LayerView

    1.LayerManager作为LayerView的容器管理所有的LayerView, 同时根节点的LayerManager管理页面级的LayerManager
    2.Layer通过发送事件的方式,通知LayerManager创建LayerView并显示.
    3.LayerView作为具体显示的弹窗,需要子类去实现

具体的使用形式请参考Loading,Toast组件

目前提供三种基本功能:

    1. 创建并显示LayerView
    
        *可选择在root层创建,或者子页面创建,例如Toast就在root节点创建,所以Toast悬浮于整个App的上方,
        *具体的子类实现层有权决定是否显示在root层还是子页面
    
    2. 更新当前已显示的LayerView,通过远程发送state的形似
    
    3. 移出当前显示的view

使用基于Layer的组件,需要在整个项目的根节点包裹LayerManager组件,
如需将弹出层在某个页面(叶子节点)显示,随页面关闭而销毁,则在需要显示的页面上的根节点上包裹LayerManager组件

示例代码

```jsx
export default class Loading extends Layer {
    static key = -1;

    /**
     * 显示一个加载窗
     * @param title
     */
    static show(title?: string) {
        if (this.key !== -1) {
            super.update(this.key, {title});
        } else {
            this.key = super.show(<LoadingView title={title}/>);
        }
    }
    /**
     * 隐藏加载窗
     */
    static hide() {
        if (this.key !== -1) {
            super.hide(this.key);
            this.key = -1;
        }
    }
}

type Props = {
    //提示的消息
    title?: string,
};

/**
 * Loading的实际view,此view不可单独使用
 */
class LoadingView extends LayerView<Props> {
    static defaultProps = {
        title: '加载中',
        ...super.defaultProps,
    };

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    onBackClicked = () => {
        return true;
    };

    buildStyle(): * {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        };
    }

    renderContent() {
        let {title} = this.state;
        return (
            <View style={styles.content}>
                <ActivityIndicator size="small" color='#fff'/>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        marginTop: 8, color: '#fff', fontSize: 16
    }
});
```

### <a name="Loading">Loading</a>

Loading形式的弹窗
此组件依赖Layer组件

    1.使用者可选择是否在root一级弹出,或者是页面级弹出.
    2.此弹框弹出后会显示一个加载框,并且屏蔽返回键,且点击无法关闭,使用时http请求方法必须要有超时方法,否则会导致弹窗无法关闭
    3.如需在页面级弹出,请在对应页面的根节点上包裹LayerManger

使用方式

```jsx
<Button
    text='开启Loading'
    onPress={() => {
        Loading.show('数据加载中...');
        setTimeout(() => {
            Loading.show('加载完毕');
            setTimeout(() => {
                Loading.hide();
            }, 2000);
        }, 2000);
    }}/>
```

 相关方法

| 方法                  | 类型     | 介绍                   |
| ------------------- | ------ | -------------------- |
| show(title?:string) | static | 显示Loading,可选是否显示加载文本 |
| hide()              | static | 去除Loading            |
