import * as types from './types'
import reducer from './reducers'



describe('Init duck reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                initialized: false,
                error: false,
                settings: {}
            }
        )
    })

    it('should handle @INIT_STORE_START', () => {
        expect(
            reducer(
                {
                    initialized: true,
                    error: false,
                    settings: {}
                },
                {
                    type: types.INIT_STORE_START
                }
            )
        ).toEqual(
            {
                'error': false,
                'initialized': false,
                'settings': {},
            }
        )
    })

    it('should handle @INIT_STORE_DONE without error', () => {
        expect(
            reducer(
                {},
                {
                    type: types.INIT_STORE_DONE
                }
            )
        ).toEqual(
            {
                'error': false,
                'initialized': true,
                'settings': {},
            }
        )
    })

    it('should handle @INIT_STORE_DONE with error', () => {
        expect(
            reducer(
                {},
                {
                    type: types.INIT_STORE_DONE,
                    error: 'There is an error !'
                }
            )
        ).toEqual(
            {
                'error': true,
                'initialized': true,
                'settings': {},
            }
        )
    })

    it('should handle @LOAD_SETTINGS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.LOAD_SETTINGS,
                    payload: {
                        data: {
                            data: [
                                {
                                    attributes: {
                                        test: 'test attribute !'
                                    }
                                }
                            ]
                        }
                    }
                }
            )
        ).toEqual(
            {
                'error': false,
                'initialized': false,
                'settings': {
                    'test': 'test attribute !',
                },
            }
        )
    })
})