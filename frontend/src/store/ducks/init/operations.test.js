import { initStore, setupApp } from "./operations"



const initStoreStart = require('./actions').initStoreStart
const initStoreDone = require('./actions').initStoreDone
// const loadSettings = require('./actions').loadSettings


jest.mock('./actions', () => ({
    initStoreStart: jest.fn(),
    initStoreDone: jest.fn(),
    // loadSettings: jest.fn(),
}))


describe('Init duck operations', () => {

    it('should execute init store operation', async () => {
        const dispatch = jest.fn()

        await initStore()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(initStoreStart())
        expect(dispatch).toHaveBeenCalledWith(initStoreDone())
    })

})