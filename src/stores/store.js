import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    _fullScreenLength: 0
  }),
  getters: {
    isFullScreen() {
      return this._fullScreenLength > 0
    }
  },
  actions: {
    setFullScreen() {
      this._fullScreenLength += 1
    },
    resetFullScreen() {
      if (this._fullScreenLength < 1) return
      this._fullScreenLength -= 1
    }
  }
})
