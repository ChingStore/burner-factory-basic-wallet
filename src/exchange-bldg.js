import axios from "axios";
import React from "react";
import Selector from "./ui/ExchBldg"
import SendPage from "@burner-wallet/ui/dist/Pages/SendPage"
const URLREGEX = /payment\/(0x[0-9a-f]{40})\/(\w*)\/([\d\.]+)\/(\w*)/i;

export default class ExchangeBldg {
  constructor() {
    // this.state = {
    //   asset:"it",
    //   to:'0xe8bF424E047372d249d0826c5567655ba3B72f18'
    // }
  }

  initializePlugin(pluginContext) {
    this._pluginContext = pluginContext;

    // pluginContext.addElement('home-top', Selector)
    // pluginContext.addPage('/pay', SendPage)

    pluginContext.onQRScanned((qr, pluginctx) => {

      if (URLREGEX.test(qr)) {
        const scan = URLREGEX.exec(qr);

        pluginctx.actions.send({
          to: scan[1],
          asset: scan[2],
          ether: scan[3],
          message: scan[4]
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
