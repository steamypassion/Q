import React from 'react';
import './Mixer.css';
import { connect } from 'react-redux';
import { hideMixer } from '../../actions/Devices';
import { bindActionCreators } from 'redux';
import Channel from './Channel';

class Mixer extends React.Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  renderChannels() {
    return this.props.nodes.map((node, idx) => {
      return <Channel node={node} key={idx} type={node.type}/>;
    });
  }

  render() {

    let style = {};

    if (!this.props.devices.mixer) {
      style = {
        display: 'none'
      };
    }

    return (
      <div className="mixer-container" style={style}>
        <div className="mixer-inner-container" style={style}>
          {this.renderChannels()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices,
    nodes: state.Nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideMixer: bindActionCreators(hideMixer, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Mixer);
