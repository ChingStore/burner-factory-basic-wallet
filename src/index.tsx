import React from "react";
import ReactDOM from "react-dom";


import { xdai, ERC20Asset } from "@burner-wallet/assets";
import BurnerCore from "@burner-wallet/core";
import { InjectedSigner, LocalSigner } from "@burner-wallet/core/signers";
import {
  InfuraGateway,
  InjectedGateway,
  XDaiGateway
} from "@burner-wallet/core/gateways";
import BurnerUI from "@burner-wallet/ui";

import ChingPlugin from "./ching-plugin";
import * as serviceWorker from "./serviceWorker";

const exchangeBldg = new ERC20Asset({
  id: "exch",
  name: "EXCH",
  network: "100",
  address: "0x9b924c026325d307efb295108bafdfd29ecb3932"
});

const brass = new ERC20Asset({
  id: "brass",
  name: "BRASS",
  network: "100",
  address: "0x1b10e34165419f475923cf56ba2157eb96fd846a"
});

const it = new ERC20Asset({
  id: "it",
  name: "IT",
  network: "100",
  address: "0xd203308fff6ba932d7cdb8bbe12aea9d57204205"
});

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway()
  ],
  assets: [xdai, exchangeBldg, brass, it]
});

const BurnerWallet = () => (
  <BurnerUI core={core} plugins={[new ChingPlugin()]} />
);

ReactDOM.render(<BurnerWallet />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
