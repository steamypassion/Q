import Node from '../elements/Node';
import { calculateDistance } from '../utils/utils';
import config from '../config/config';

const initialState = [];

const addNode = (state, position, audioContext) => {
  let node = new Node(position, audioContext);
  let nodeList = state.splice(0);
  nodeList.push(node);
  return nodeList;
};

const detectCollisions = (state, streams) => {

  state.forEach((node) => {
    if (!node.isPlaying) {
      streams.forEach((stream) => {
        stream.particles.forEach((particle) => {
          let distance = calculateDistance(node.position, particle.position);
          if (distance <= config.app.collisionDistance) {
            node.play();
          }
        });
      });
    }
  });

  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      return addNode(state, action.position, action.audioContext);
    case 'DETECT_COLLISIONS':
      return detectCollisions(state, action.streams);
    default:
      return state;
  }
};