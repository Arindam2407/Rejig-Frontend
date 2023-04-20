import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader(){
    const{ enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        if(!isWeb3Enabled && 
            typeof(window) !== "undefined" && 
            window.localStorage.getItem("connected")){
                enableWeb3()
            }
    },
    [isWeb3Enabled]
    )

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changed to ${account}`)
            if(account == null){
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account found")
            }
        })
    },[])

    return(<div>
        {account? (<div>Connected to {account} </div>) : 
        (<button onClick={async() => {await enableWeb3()
        if (typeof(window) !== "undefined"){
            window.localStorage.setItem("connected","injected")
        }}} disabled = {isWeb3EnableLoading}> Connect wallet </button>)}
        </div>)
}