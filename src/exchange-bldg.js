import axios from "axios";
import React from "react";
const URLREGEX = /payment\/(0x[0-9a-f]{40})\/([\d\.]+)\/(\w*)/i;

export default class ExchangeBldg {
  constructor() {
    // this.assetId = assetId;
    // this.contractAddress = contractAddress;
    // this.network = network;
    //
    // this.contract = null;
  }

  initializePlugin(pluginContext) {
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

    pluginContext.onQRScanned((qr, pluginctx) => {
      if (URLREGEX.test(qr)) {
        const scan = URLREGEX.exec(qr);

        pluginctx.actions.send({
          to: scan[1],
          asset: "it",
          ether: scan[2],
          message: scan[3]
        });

        return true;
      }
    });
  }

  getWeb3() {
    return this._pluginContext.getWeb3(this.network);
  };
}
