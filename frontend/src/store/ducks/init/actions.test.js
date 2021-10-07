import * as types from "./types"
import * as actions from "./actions"



describe('Init duck actions', () => {
    it('should execute init store action', () => {
        expect(actions.initStoreStart()).toEqual({"type": types.INIT_STORE_START})
    })

    it('should execute init done action', () => {
        expect(actions.initStoreDone()).toEqual({"type": types.INIT_STORE_DONE})
    })

    it('should execute load settings action', () => {
        expect(actions.loadSettings()).toEqual({"type": types.LOAD_SETTINGS})
    })
})