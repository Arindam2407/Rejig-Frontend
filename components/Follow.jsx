import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import { ethers } from "ethers"
import FollowImpl from "./FollowImpl"

export default function Follow() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [showModal, setShowModal] = useState(false)
    const [profile, setProfile] = useState(0);
    const [handle, setHandle] = useState("");

    const hideModal = () => setShowModal(false)

    const {
        runContractFunction: getProfile,
        data: enterTxResponse_1,
        isLoading_1,
        isFetching_1,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "getProfile",
        msgValue: 0,
        params: {profileId : profile},
    })

    async function updateUIValues() {
        const handleFromCall = (await getProfile())[9];
        console.log(handleFromCall);
        setHandle(handleFromCall);
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
        <div className="p-5 items-center">
            <h1 className="py-4 px-4 font-bold text-3xl items-center">Follow Profile</h1>
            {rejigAddress ? (
                <>
                <div>
                <FollowImpl
                profile={profile}
                handle = {handle}
                isVisible={showModal}
                onClose={hideModal}/>
                <Input
                        label="Profile to Follow"
                        name="Set Profile to Follow"
                        type="number"
                        onChange={(event) => {
                            setProfile(event.target.value)
                        }}></Input>
                            <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={handleCardClick}
                    >
                        {"Go"}
                    </button>
                </div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}