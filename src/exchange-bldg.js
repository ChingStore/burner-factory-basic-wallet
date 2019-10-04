import axios from "axios";

const URLREGEX = /payment\/(0x[0-9a-f]{40})\/(\w*)\/([\d\.]+)\/(\w*)/i;

export default class ExchangeBldg {
  initializePlugin(pluginContext) {
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
}
