import * as types from './types'
import reducer from './reducers'



const storeRecords = require('./utils').storeRecords
const cleanRecord = require('./utils').cleanRecord


jest.mock('./utils', () => ({
    storeRecords: jest.fn(),
    cleanRecord: jest.fn()
}))



describe('Api duck reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                requested: false,
                pendingRequests: 0,
                entities: {}
            }
        )
    })

    it('should handle @API_REQUEST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: types.API_REQUEST
                }
            )
        ).toEqual(
            {
                requested: true,
                pendingRequests: 1,
                entities: {}
            }
        )
    })

    it('should handle @API_RESPONSE', () => {
        storeRecords.mockReturnValue({ data: 'data' })

        expect(
            reducer(
                {
                    requested: true,
                    pendingRequests: 1,
                    entities: {}
                },
                {
                    type: types.API_RESPONSE,
                    payload: {
                        name: 'Nicolas',
                        id: 1
                    }
                }
            )
        ).toEqual(
            {
                requested: false,
                pendingRequests: 0,
                entities: {
                    data: 'data'
                }
            }
        )
    })

    it('should handle @API_CLEAN_RECORD', () => {
        cleanRecord.mockReturnValue({})

        expect(
            reducer(
                {
                    requested: false,
                    pendingRequests: 0,
                    entities: {
                        data: 'data'
                    }
                },
                {
                    type: types.API_CLEAN_RECORD,
                }
            )
        ).toEqual(
            {
                requested: false,
                pendingRequests: 0,
                entities: {}
            }
        )
    })

    it('should handle @API_UPDATE_RECORD_PROPERTY', () => {
        expect(
            reducer(
                {
                    requested: false,
                    pendingRequests: 0,
                    entities: {
                        data: 'data'
                    }
                },
                {
                    type: types.API_UPDATE_RECORD_PROPERTY,
                    payload: {
                        databis: 'databis'
                    }
                }
            )
        ).toEqual(
            {
                requested: false,
                pendingRequests: 0,
                entities: {
                    data: 'data',
                    databis: 'databis'
                }
            }
        )
    })
})