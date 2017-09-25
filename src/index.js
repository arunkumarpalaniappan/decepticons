import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  
import { BrowserRouter, Route } from 'react-router-dom';  
import Cards from './components/Cards';
import registerServiceWorker from './registerServiceWorker'; 

ReactDOM.render(<Provider store={{}}>
    <BrowserRouter>
    <div>
        <Route path='/' component={Cards} />
    </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
