import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

// const Routes = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Switch>
//           <Route
//             exact
//             path="/"
//             component={() => {
//               <div>login</div>;
//             }}
//           />
//           <Route path="/">
//             <Switch>
//               <div className="content">
//                 <Sidebar />
//                 <div className="test">
//                   <Header />
//                   <Switch>
//                     <PrivateRoute
//                       path="/painel"
//                       exact
//                       component={() => {
//                         <div>painel</div>;
//                       }}
//                     />
//                     <PrivateRoute
//                       exact
//                       path="/user"
//                       component={() => {
//                         <div>user</div>;
//                       }}
//                     />
//                   </Switch>
//                 </div>
//               </div>
//             </Switch>
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     </div>
//   );
// };
