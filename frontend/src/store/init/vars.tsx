import { makeVar } from '@apollo/client';


export const isAppReadyVar = makeVar<boolean>(false);
export const mealsVar = makeVar<Array<any>>([]);