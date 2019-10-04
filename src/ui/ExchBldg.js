import React, { Component } from 'react';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId:'it'
    }
  }

  render() {
    const { burnerComponents, plugin, core } = this.props;
    const { AssetSelector } = burnerComponents;

    return (
      <AssetSelector assets={["exch, brass, it"]} selected={plugin.con} onChange={()=>{alert("bazinga!")}}>

      </AssetSelector>
    );
  }
}
