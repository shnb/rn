import {
    createStackNavigator
} from 'react-navigation';
import App from "./App";
import StatusViewPage from "./page/StatusViewPage";
import StackLayoutPage from "./page/StackLayoutPage";
import ToolBarPage from "./page/ToolBarPage";
import SwiperPage from "./page/SwiperPage";
import LoadingPage from "./page/LoadingPage";
import NumberPayKeyboardPage from "./page/NumberPayKeyboardPage";


const StacksPage = createStackNavigator({

    App: {
        screen: App,
        navigationOptions: {
            header: null
        }
    },
    StatusViewPage: {
        screen: StatusViewPage,
        navigationOptions: {
            header: null
        }
    },
    StackLayoutPage: {
        screen: StackLayoutPage,
        navigationOptions: {
            header: null
        }
    },
    ToolBarPage: {
        screen: ToolBarPage,
        navigationOptions: {
            header: null
        }
    },
    LoadingPage: {
        screen: LoadingPage,
        navigationOptions: {
            header: null
        }
    },
    NumberPayKeyboardPage: {
        screen: NumberPayKeyboardPage,
        navigationOptions: {
            header: null
        }
    },
    SwiperPage: {
        screen: SwiperPage,
        navigationOptions: {
            header: null
        }
    },

});

export default StacksPage;
