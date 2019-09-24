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

- <a href="#MoneyTextInput">MoneyTextInput</a>

- <a href="#BasePage">BasePage</a>

- <a href="#BaseListPage">BaseListPage</a>

- <a href="#CityPicker">CityPicker</a>

- <a href="#DatePicker">DatePicker</a>

- <a href="#HoursPicker">HoursPicker</a>

- <a href="#SinglePicker">SinglePicker</a>

- <a href="#PopLayer">PopLayer</a>

- <a href="#PopMenu">PopMenu</a>

- <a href="#RefreshListView">RefreshListView</a>

- SearchBar

- Space

- Divider

- StackLayout

- StatusImage

- StatusView

- Toast

- ToolBar

- Timer

### <a name="Button">Button</a>

**使用方法**

```jsx
<Button text='我是按钮'/>
```

**属性列表**

| 属性名              | 类型              | 介绍                   |
|:---------------- | --------------- | -------------------- |
| backgroundColor? | string          | 背景颜色                 |
| style            | Object          | 按钮的style,同view的style |
| onPress          | Function        | 点击事件                 |
| textStyle?       | Object          | 文字的style             |
| text             | string          | 按钮的文本                |
| bRef?            | string或Function | 真正的ref               |

### <a name="CheckBox">CheckBox</a>

**使用方法**

```jsx
<CheckBox
label='去吃饭吗,小伙'
check={this.state.check}
onCheckChange={(check) => {                                              
    this.setState({check:!this.state.check});
    Toast.message(check ? '选中了' : '没选中');
}}/>  
```

**属性列表**

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

**使用方法**

```jsx
Dialog.show('我是弹窗', 
            '我时一个弹窗,使用的是时候只需Dialog.show(),show方法需要标题,内容,任意个按钮,试试看吧',
            [{text: '不懂', onClick: () => {Toast.message('你真笨')}},
             {text: '有点懂',onClick: () => {Toast.message('你靠谱')}},
             {text: '明白了',onClick: () => {Toast.message('你很棒')}}],
);
```

**属性列表**

| 属性名类型介绍  |                                                                            |             |
| -------- | -------------------------------------------------------------------------- | ----------- |
| title?   | string                                                                     | 标题          |
| content  | string                                                                     | 内容文本        |
| buttons  | Array<{ text: string, style?: {}, onClick: Function }>                     | 按钮的数组       |
| options? | { dialogStyle?: {}, titleStyle?: {}, contentStyle?: {}, buttonStyle?: {} } | dialog的其他属性 |

### <a name="DialogList">DialogList</a>

列表形式的dialog,点击列表项弹窗消失

此组件依赖于Layer组件

**使用方法**

```jsx
DialogList.show(['python', 'ruby', 'java', 'c++', 'php', 'kotlin', 'dart'],
                 (index, value) => Toast.message(value));
```

**属性列表**

| 属性名             | 类型                                    | 介绍       |
| --------------- | ------------------------------------- | -------- |
| list            | Array<string>                         | 数据源列表    |
| onClick         | Function<{index:number,value:string}> | 列表项的点击事件 |
| Function->index | number                                | 列表项的序号   |
| Function->value | value:string                          | 列表项的值    |

### <a name="UpdateDialog">UpdateDialog</a>

检查更新组件,具体UI样式请运行项目查看
此组件依赖Layer组件

**使用方法**

```jsx
UpdateDialog.show('v1.1.2',
                  true,
                  ['功能优化1', '功能优化2', '功能优化3', '功能优化4'],
                  () => {
                       Toast.message('开始更新拉');
                  });
```

**属性列表**

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

**使用方法**

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

**属性列表**

| 属性     | 类型     | 介绍                |
| ------ | ------ | ----------------- |
| style  | Object | 组件的样式,同view的style |
| colNum | number | 列数                |
| width  | number | 组件的宽度             |

### <a name="Label">Label</a>

显示一个标签,具备placeHolder功能的TextView

**使用方式**

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

**属性列表**

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

**使用方式**

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

** 相关方法**

| 方法                  | 类型     | 介绍                   |
| ------------------- | ------ | -------------------- |
| show(title?:string) | static | 显示Loading,可选是否显示加载文本 |
| hide()              | static | 去除Loading            |

### <a name="MoneyTextInput">MoneyTextInput</a>

输入金额的TextInput,只保留两位小数,如果用户输入的不合法,则无法输入,

注意:此控件由于rn的bug,所以不兼容rn 0.59以下版本

**使用方式**
    使用方式与TextInput基本相同

```jsx
<MoneyTextInput
    style={{
        width: 200, borderColor: '#000', borderWidth: 1, borderRadius: 6,
        paddingLeft: 16, paddingRight: 16
    }}
    placeholder='请输入金额'/>
```

**相关属性**

| 属性     | 类型     | 介绍               |
| ------ | ------ | ---------------- |
| style  | Object | 同TextInput的style |
| value? | string | textInput默认显示的文本 |

### <a name="BasePage">BasePage</a>

所有页面的基类

注意:不含有标题栏的实现,如需请使用ToolBar实现标题栏

    1.实现了返回键的相关处理
    2.更快捷的访问路由参数
    3.更加方便的跳转和返回
    4.支持链式注册事件监听,具备自动取消监听功能

**使用方式**

        直接继承此类即可

**相关方法**

| 方法                                                                         | 类型   | 介绍                       |
| -------------------------------------------------------------------------- | ---- | ------------------------ |
| enableBack:boolean                                                         | 成员方法 | 是否允许注册返回键监听,默认注册         |
| addEvent(eventType: string, listener: Function, context: ?Object):BasePage | 成员方法 | 注册DeviceEventEmitter监听事件 |
| onBackClicked:void                                                         | 成员方法 | 默认的返回键的处理(返回上一级页面)       |
| navigate(page, params = {}):void                                           | 成员方法 | 跳转到某个路由                  |
| goBack():void                                                              | 成员方法 | 返回上一级页面                  |

### <a name="BaseListPage">BaseListPage</a>

列表页的基类

        1.实现了上拉加载和下拉加载的处理逻辑
        2.实现了请求到数据源之后的处理逻辑
        3.实现了上拉加载下拉加载错误的处理和显示
        4.处理了空页面和没有更多数据的处理逻辑
        5.处理了上拉加载和下拉加载出错重试逻辑和交互
        6.支持自定义空页面和错误页面
        7.支持安全的渲染cell
        8.支持其他加载的自定义

**使用方式**

如果非常贴合该类的默认实现,则只需实现getApiCall方法和render方法(调用renderList方法)

    1.继承此类
    2.覆写renderItem方法,返回需要渲染的item
    3.覆写getApiCall方法,返回含有http response的Promise
    4.覆写getPageSize方法,默认返回20,如也是20,可不实现此方法
    5.覆写getResponseList方法,默认返回response.dataList,如也是dataList,,可不覆写
    6.覆写renderEmpty方法,默认返回一个空页面的view,如需要更改,则覆写
    7.实现render方法,在此方法中调用renderList方法渲染出列表

**相关方法**

| 方法                                               | 介绍                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| renderItem(info)                                 | 渲染item,需要覆写,返回需要渲染的item                                                       |
| getPageSize():number                             | 默认20,可不覆写                                                                     |
| getResponseList(response: { dataList: Array }) { | 返回response的列表,默认为dataList,如同,可不覆写                                             |
| getApiCall(): Promise                            | 返回含有http response的的Promise对象,必须覆写                                             |
| renderEmpty                                      | 渲染空页面,默认返回一个空页面,如需自定义则覆写                                                      |
| renderList                                       | 渲染实际的列表,此方法需要使用者手动调用,返回要渲染的列表,如需对其他列表加载的属性进行更改,请覆写此方法,内部的参数请参考RefreshListView |

### <a name="CityPicker">CityPicker</a>

省市县的选择器,内置了默认的城市编码,如需特殊编码,请自行更换,目前只支持省市县,如需要省县,或者是单独省的选择,请自行实现

此组件基于ScrollPicker和Layer组件

**使用方式**

使用时需要传入一个默认的已选中的省市县,或者是null or "";

```jsx
CityPicker.show(this.state.city, 
                (city) => {
                            this.setState({
                                city: city
                            })
                });
```

### <a name="DatePicker">DatePicker</a>

日期选择器,支持年月日的选择器,所有的选择器的UI风格均是一致的

此组件基于ScrollPicker和Layer组件

**使用方式**

使用时需要传入一个默认的已选中的年月日,或者是null or "";

```jsx
DatePicker.show(this.state.date, (date) => {
    this.setState({
        date: date
    })
})
```

### <a name="HoursPicker">HoursPicker</a>

小时区间选择器,例如08:00-20:00

此组件基于ScrollPicker和Layer组件

**使用方式**

使用时需要传入默认的已选中的开始时间和结束时间,或者是null or "";

```jsx
HoursPicker.show(this.state.hourStart, this.state.hourEnd, (start, end) => {
    this.setState({
        hourStart: start,
        hourEnd: end
    })
})
```

### <a name="SinglePicker">SinglePicker</a>

单一条件的选择器

此组件基于ScrollPicker和Layer组件

**使用方式**

使用时需要传入默认一选中的值,或者是null or "";

list为数组,数组内对象需要name和value键值对,显示用name显示,取值或赋值均用value

```jsx
let list = [
    {name: 'php', value: 0},
    {name: 'java', value: 1},
    {name: 'js', value: 2},
    {name: 'android', value: 3},
    {name: 'ios', value: 4},
    {name: 'python', value: 5},
    {name: 'swift', value: 5},
];
SinglePicker.show(list, this.state.value ? this.state.value.value : null, (index, data) => {
    this.setState({
        value: data
    })
})
```

### <a name="PopLayer">PopLayer</a>

此组件以某个锚点view为基准,在此锚点view附近显示,并且根据当前锚点view的位置,和自身的位置,动态的计算出自已应该显示在什么位置.

此组件为Pop类型的基础组件,需要具体的去实现,如需使用请参考PopMenu相关代码

此组件依赖Layer组件

### <a name="PopMenu">PopMenu</a>

此组件为弹出按钮,类似于微信右上角的PopMenu

此组件可计算屏幕的控件是否足够显示来调整自身显示的位置,

此组件依赖PopLayer组件

**使用方式**

第一个参数为锚点view ,list为按钮数组,onClick是点击回调,yOffset是y轴的偏移量,

更多属性请查阅代码

```jsx
PopMenu.show(this.btn, {
            list: ['python', 'ruby', 'java', 'c++', 'php', 'kotlin', 'dart'],
            onClick: (index, value) => Toast.message(value),
            yOffset: -20,
        })
```

### <a name="RefreshListView">RefreshListView</a>

具备各种状态的flatList

        1.具备下拉刷新功能
        2.具备上拉加载功能
        3.具备空页面功能
        4.具备各种加载失败的重试功能
        5.具备没有更多数据功能
        6.具备UI自定义功能

**使用说明**

大体上与FlatList用法相同

```jsx
 <RefreshListView
    data={this.state.listData}
    ListHeaderComponent={this.renderHeader.bind(this)}
    renderEmpty={this.renderEmpty.bind(this)}
    renderItem={this.renderCell.bind(this)}
    keyExtractor={this.keyExtractor}
    refreshState={this.state.refreshState}
    onLoadMore={this.onFooterRefresh.bind(this)}
    onRefresh={this.onHeaderRefresh.bind(this)}/>
```

**属性列表**

| 属性名                          | 类型       | 介绍           |
| ---------------------------- | -------- | ------------ |
| onRefresh                    | Function | 下拉刷新回调       |
| onLoadMore?                  | Function | 上拉加载更多回调     |
| refreshState                 | number   | 刷新的状态        |
| listRef                      | any      | flatList的ref |
| loadMoreRefreshingComponent? | any      | 上拉加载更多的自定义组件 |
| loadMoreRefreshingText?      | string   | 上拉加载更多的文字    |
| noMoreDataComponent?         | any      | 没有更多数据的自定义组件 |
| noMoreDataText?              | string   | 没有更多数据的文字    |
| loadMoreErrorText?           | string   | 加载失败文字       |
| renderLoading?               | Function | 渲染loading页面  |
| renderEmpty?                 | Function | 渲染空数据页面      |
| renderError?                 | Function | 渲染错误页面       |
| data                         | Array    | 列表的数据源       |
