import Vue from "vue";
import Account from "../models/Account";

export interface Store {
  account: Account | null;
}

const store: Store = {
  account: null,
};

const observer = Vue.observable(store);

Vue.prototype.$store = observer;

export default observer;
