export default {
  setItem: () => Promise.resolve(),
  getItem: () => Promise.resolve(null),
  removeItem: () => Promise.resolve(),
  clear: () => Promise.resolve(),
  getAllKeys: () => Promise.resolve([]),
  multiGet: () => Promise.resolve([]),
  multiSet: () => Promise.resolve(),
  multiRemove: () => Promise.resolve(),
  multiMerge: () => Promise.resolve(),
};