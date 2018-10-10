import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BookmarkView from './jsx/views/BookmarkView'
import BookmarkListingView from './jsx/views/BookmarkListingView'

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={BookmarkListingView} />
        <Route exact path='/bookmark' component={BookmarkView}/>
        <Route path='/bookmark/:id' component={BookmarkView}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router