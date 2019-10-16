import React from "react";
import ReactDOM from "react-dom";

import { xdai, dai, eth } from "@burner-wallet/assets";
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

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway()
  ],
  assets: [xdai, dai, eth]
});

const BurnerWallet = () => (
  <BurnerUI core={core} plugins={[new ChingPlugin()]} />
);

ReactDOM.render(<BurnerWallet />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
