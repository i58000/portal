import { HashRouter as Router, Route } from "react-router-dom";
import CacheRoute from 'react-router-cache-route'

import Layout from "./views/Layout";
import Gallery from "./views/Gallery";
// import Picture from "./views/Picture";

export default function createRouter() {
  return (
    <Layout>
      <Router>
        <CacheRoute exact path="/" component={Gallery}></CacheRoute>
        {/* <CacheRoute path="/p/:id" component={Picture}></CacheRoute> */}
      </Router>
    </Layout>
  );
}
