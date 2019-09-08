This is a version of Burner Wallet that will allow The Exchange Building to
use many different custom tokens on the xDai chain with the Ching! PoS's
around downtown.

It will need to be hosted at uzb.cash in the near future.

The feature that needs to be implemented now is:
**it needs to alert the Ching! service that a transaction has been sent**

In order to assist in testing I have loaded a couple dozen IT tokens and a
little gas on an address with the following private key:
`4a653f2dd3509a5e1fb0961330c65e80af1d094fbf8fc49c0b2bff01ba20f580`

The primary functionality exists in src/exchange-bldg.js
Notes are included in that file describing how Austin got the original Burner
Wallet to communicate with Ching!.
