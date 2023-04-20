import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import { ethers } from "ethers"
import PubImpl from "./PubImpl"
 
export default function Pub({profileId,pubId}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

    const [isTypeComment, setIsTypeComment] = useState(false)
    const [userProfileId, setUserProfileId] = useState(0)

    const {
        runContractFunction: getIdFromUser,
        data: enterTxResponse0,
        isLoading0,
        isFetching0,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "getIdFromUser",
        msgValue: 0,
        params: {user : account},
    })

    async function updateUIValues() {
        const profileIdFromCall = await getIdFromUser()
        setUserProfileId(profileIdFromCall)
    }

    const handleCardClickComment = () => {
        updateUIValues()
        setIsTypeComment(true)
        setShowModal(true)
    }

    const handleCardClickMirror = () => {
        updateUIValues()
        setIsTypeComment(false)
        setShowModal(true)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Publication</h1>
            {rejigAddress ? (
                <>
                <div>
                <PubImpl
                userProfileId={userProfileId}
                profileId={profileId}
                pubId={pubId}
                isVisible={showModal}
                onClose={hideModal}
                isTypeComment = {isTypeComment}/>
                <Card>
                    <h1>{`Publication #${pubId} of profile ${profileId}`}</h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={handleCardClickComment}
                    >
                        {"Comment"}
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={handleCardClickMirror}
                    >
                        {"Mirror"}
                    </button>
                </Card>
                            
                </div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}