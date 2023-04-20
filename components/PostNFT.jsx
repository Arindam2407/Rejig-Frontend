import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import { ethers } from "ethers"
import PostNFTImpl from "./PostNFTImpl"

export default function PostNFT() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

    const[profileId, setProfileId] = useState(0)

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
        setProfileId(profileIdFromCall)
    }

    const handleCardClick = () => {
        updateUIValues()
        setShowModal(true)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl align-items: center">Post NFT</h1>
            {rejigAddress ? (
                <>
                <div>
                <PostNFTImpl
                profileId={profileId}
                isVisible={showModal}
                onClose={hideModal}/>
                <Card
                    title="Post NFT"
                    onClick={handleCardClick}
                />
                </div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}