import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import { ethers } from "ethers"
import BuyNFTImpl from "./BuyNFTImpl"

export default function BuyNFT({profileId, pubId}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)

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
            <h1 className="py-4 px-4 font-bold text-3xl align-items: center">Buy NFT</h1>
            {rejigAddress ? (
                <>
                <div>
                <BuyNFTImpl
                profileId = {profileId}
                pubId = {pubId}
                isVisible={showModal}
                onClose={hideModal}/>
                <Card
                    title="Buy NFT"
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