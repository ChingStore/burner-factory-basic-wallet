This is a version of Burner Wallet that will allow The Exchange Building to
use many different custom tokens on the xDai chain with the Ching! PoS's
around downtown.

It will need to be hosted at uzb.cash in the near future.

TODO:
**it needs to alert the Ching! service that a transaction has been sent**
- Ask David to add "onTXSent" callback, so that we can call Ching endpoint with the new txHash there
- `https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=<orderId>&txHash=<txHash>&networkId=100`

In order to assist in testing I have loaded a couple dozen IT tokens and a
little gas on an address with the following private key:
`4a653f2dd3509a5e1fb0961330c65e80af1d094fbf8fc49c0b2bff01ba20f580` or `0x4a653f2dd3509a5e1fb0961330c65e80af1d094fbf8fc49c0b2bff01ba20f580` if the leading '0x' identifier is required.

The primary functionality exists in src/exchange-bldg.js
Notes are included in that file describing how Austin got the original Burner
Wallet to communicate with Ching!.
