import axios from "axios";

function getTxDetails(qr) {
  const REGEX = /\/payment\/(0x[0-9a-f]{40})\/((\D\w*)\/)?([\d.]+)\/(\w*)/i
  const scan = REGEX.exec(qr)

  if (!scan) {
    return null
  }

  return {
    to: scan[1],
    tokenName: scan[3] || 'xdai',
    amount: scan[4],
    orderId: scan[5]
  }
}

export default class Ching {
  initializePlugin(pluginContext) {
    pluginContext.onQRScanned((qr, pluginCtx) => {
      console.log("Scanned:", qr)
      const txDetails = getTxDetails(qr)

      if (!txDetails) {
        return
      }

      console.log(txDetails)

      pluginCtx.actions.send({
        to: txDetails.to,
        asset: txDetails.tokenName.toLowerCase(),
        ether: txDetails.amount,
        message: txDetails.orderId
      });

      return true;
    });

    pluginContext.onSent(tx => {
      console.log("Sent:", { tx });

      let url =
        "https://us-central1-daipos.cloudfunctions.net/transactionBuffer?" +
        "orderId=" + tx.message +
        "&txHash=" + tx.hash +
        "&networkId=100";

      console.log("Send tx details back:", url);

      axios.get(url).then(response => {
        console.log("Finished hitting the Ching servers:", response);
      });
    });
  }
}
