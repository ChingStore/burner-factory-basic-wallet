import axios from "axios";
import React from "react";
import SendPage from "@burner-wallet/ui/dist/Pages/SendPage"
const URLREGEX = /payment\/(0x[0-9a-f]{40})\/([\d\.]+)\/(\w*)/i;

export default class Ching {
  constructor() {
  }

  initializePlugin(pluginContext) {
    this._pluginContext = pluginContext;

    pluginContext.onQRScanned((qr, pluginctx) => {

      if (URLREGEX.test(qr)) {
        const scan = URLREGEX.exec(qr);

        pluginctx.actions.send({
          to: scan[1],
          asset: 'xdai',
          ether: scan[2],
          message: scan[3]
        })

        return true;
      }
    });

    pluginContext.onSent(tx => {
      console.log({ tx });

      let url =
      "https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=" +
      tx.message +
      "&txHash=" +
      tx.hash +
      "&networkId=100";

      console.log("url:", url);

      axios.get(url).then(response => {
        console.log("Finished hitting the Ching servers:", response);
      });
    });
  }

  getWeb3() {
    return this._pluginContext.getWeb3(this.network);
  };
}
