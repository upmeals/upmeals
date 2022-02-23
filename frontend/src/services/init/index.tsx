import { setInitIsAppReady } from "../../store/init/operations"
import { clearModalIfOnce } from "../../store/modal/operations"
import { gqlAuthLogout, gqlAuthRefresh } from "../gql/Auth"


const initApp = async () => {
    try {
        if (localStorage.getItem('accessToken')) {
            await gqlAuthRefresh()
        }

        if (localStorage.getItem('modalProps')) {
            await clearModalIfOnce()
        }

        setInitIsAppReady(true)

        return { success: 'true' }
    } catch (e) {
        await gqlAuthLogout()

        setInitIsAppReady(true)
        
        return { error: e }
    }
}


export { initApp }