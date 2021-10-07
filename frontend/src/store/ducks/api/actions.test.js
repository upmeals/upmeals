import * as types from "./types"
import * as actions from "./actions"



describe('Api duck actions', () => {
    it('should execute api request action', () => {
        expect(actions.apiRequest()).toEqual({"type": types.API_REQUEST})
    })

    it('should execute api clean record action', () => {
        expect(actions.apiCleanRecord()).toEqual({"type": types.API_CLEAN_RECORD})
    })

    it('should execute api response action', () => {
        expect(actions.apiResponse()).toEqual({"type": types.API_RESPONSE})
    })

    it('should execute api set record action', () => {
        expect(actions.setRecord()).toEqual({"type": types.API_SET_RECORD_MANUAL})
    })

    it('should execute api update record property action', () => {
        expect(actions.updateRecordProperty('name', 'Nicolas')).toEqual(
            {
                "payload": { 
                    name: "Nicolas" 
                }, 
                type: types.API_UPDATE_RECORD_PROPERTY
            }
        )
    })
})