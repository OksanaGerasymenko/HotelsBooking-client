import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Footer from "./components/ui/footer";
import User from "./layouts/user";
import AdminDashboard from "./layouts/adminDashboard";
import Login from "./layouts/logIn";
import LogOut from "./layouts/logOut";
import NotFound from "./layouts/notFound";
import NavBar from "./components/ui/navBar";
import Hotels from "./layouts/hotels";
import Reserve from "./layouts/reserve";
import ProtectedRoute from "./components/common/protectedRoute"
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <div className="wrap">
      <div className="content">
        <AppLoader>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Main} />
            <ProtectedRoute path="/adminDashboard" component={AdminDashboard} />
            <Route path="/hotels/:hotelId?" component={Hotels} />
            <Route path="/login/:type?" component={Login} />
            <ProtectedRoute path="/users/:userId" component={User} />
            <ProtectedRoute path="/reserve" component={Reserve} />
            <Route path="/logOut" component={LogOut} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/" />
          </Switch>
        </AppLoader>
      </div>
      <Footer />
    </div>
  );
}

export default App;
