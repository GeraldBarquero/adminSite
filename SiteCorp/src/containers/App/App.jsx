import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '../../services/store';

// dinamically create app routes
import appRoutes from '../../routes/app.jsx';
import LoaderDots from "../../components/Loaders/dots";


class App extends Component{
    constructor(props){
        super(props);
            this.state = {
                loading: true
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500);
    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
        
    }
    
    render(){
        
        let data;
        if (this.state.loading) {
        data = <LoaderDots/>
        } else {
        data = <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <Switch>
                            {
                                appRoutes.map((prop,key) => {
                                    return (
                                        <Route path={prop.path} component={prop.component} key={key} />
                                    );
                                })
                            }
                        </Switch>
                    </PersistGate>
                </Provider>
        }
        return (
            <div>
                {data} 
            </div>
        );
    }
}

export default App;
