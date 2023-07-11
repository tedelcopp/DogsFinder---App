import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Landing, Details, CreateDog } from "./components/index.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/details/:idRaza">
            <Details />
          </Route>
          <Route path="/create-dog">
            <CreateDog />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
