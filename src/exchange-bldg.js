// import axios from "axios";
import React from "react";
const URLREGEX = /payment\/(0x[0-9a-f]{40})\/([\d\.]+)\/(\w*)/i;

// // @Aaron this is how Austin pings our servers
// if (this.props.receipt && this.props.receipt.daiposOrderId) {
//   console.log("This was a daipos Order... ping their server for them...");
//   // https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=0JFmycULnk9kAboK5ESg&txHash=0x8c831cd5cbc8786982817e43a0a77627ad0b12eaa92feff97fb3b7e91c263b1c&networkId=100
//   let url =
//     "https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=" +
//     this.props.receipt.daiposOrderId +
//     "&txHash=" +
//     this.props.receipt.result.transactionHash +
//     "&networkId=100";
//   console.log("url:", url);
// axios.get(url).then(response => {
//   console.log("Finished hitting the Ching servers:", response);
// });
// }
//
// // @Aaron this is how Austin renders a ching order id
// if (data && data.indexOf("get.status.im") >= 0) {
//   let paymentLocation = data.indexOf("payment/");
//   let paymentParts = data.substring(paymentLocation);
//   let paymentPartsArray = paymentParts.split("/");
//   console.log("Status Deep Link paymentParts", paymentParts, paymentPartsArray);
//
//   if (paymentPartsArray.length >= 4) {
//     let toAddress = paymentPartsArray[1];
//     let amount = paymentPartsArray[2];
//     let orderId = paymentPartsArray[3];
//     this.props.returnToState({
//       toAddress,
//       amount,
//       daiposOrderId: orderId,
//       message: "Ching Order: " + orderId
//     });
//   }
// }
//
// @Aaron ask David to add "onTXSent" callback, so that we can call Ching endpoint with the new txHash there
// https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=<orderId>&txHash=<txHash>&networkId=100

export default class ExchangeBldg {
  initializePlugin(pluginContext) {
    // pluginContext.onSent(tx => {
    //   console.log({ tx });
    //   if (tx.id === "test") {
    //     // axios.get(url).then(response => {
    //     //   console.log("Finished hitting the Ching servers:", response);
    //     // });
    //     return "/receive";
    //   }
    // });
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

// const Btn = ({ actions, burnerComponents }) => {
//   const { Button } = burnerComponents;
//   return (
//     <Button
//       onClick={() =>
//         actions.send({
//           to: "0x0000000000000000000000000000000000000000",
//           ether: "0.1",
//           id: "test",
//           asset: "geth"
//         })
//       }
//     >
//       Send
//     </Button>
//   );
// };
//
// export default class SenderPlugin {
//   initializePlugin(ctx) {
//     ctx.addElement("home-top", Btn);
//     ctx.onSent(tx => {
//       if (tx.id === "test") {
//         return "/receive";
//       }
//     });
//   }
// }
