const shaka = {
  polyfill: {
    installAll: () => {
      console.log('Mock shaka.polyfill.installAll called');
    }
  },
  Player: class {},
  ui: {
    Overlay: class {},
    Controls: class {}
  }
};
export default shaka;