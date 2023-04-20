import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import ProfileCreation from "./ProfileCreation"
import Setter from "./Setter"
import { ethers } from "ethers"

export default function Profile() {
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

    async function profileExists() {
        const id = await getIdFromUser()
        if(id !== "undefined"){
            setProfileId(id)
            return true
        } return false
    }

    async function updateUIValues() {
    }

    const handleCardClick = () => {
        setShowModal(true)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl items-center">Create Profile</h1>
            {rejigAddress ? (
                <>
                <div>
                <ProfileCreation
                isVisible={showModal}
                onClose={hideModal}/>
                <Card
                    title="Profile Creation"
                    description="Create Profile"
                    onClick={handleCardClick}
                />
                <Setter _profileId = {profileId}/>
                </div>
                </>
            ): (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}