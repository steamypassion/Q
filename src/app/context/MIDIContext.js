
class MIDIContext {
  constructor() {
    this.context = null;
    this.outputs = null;
  }

  initialize() {
    if (navigator.requestMIDIAccess) {
      this.context = navigator.requestMIDIAccess({sysex: false});
      return this.context.then((ctx) => {
        let newOutputs = [];
        for (let output of ctx.outputs.values()) {
          newOutputs.push(output);
        }
        this.outputs = newOutputs;
      });
    }
  }
}

export default (new MIDIContext());
