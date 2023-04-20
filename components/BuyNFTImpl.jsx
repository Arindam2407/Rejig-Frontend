import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function BuyNFTImpl({profileId, pubId, isVisible, onClose}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [msgValue, setMsgValue] = useState(0);

    const dispatch = useNotification()

    const {
        runContractFunction: buyNFT,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "buyNFT",
        msgValue: msgValue,
        params: {_profileId : profileId,
        _pubId : pubId},
    })

    async function updateUIValues() {
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])


    const handleNewNotification = () => {
        dispatch({
            type: "success",
            message: "NFT Post Bought",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setMsgValue(0)
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-5 items-center">
            {rejigAddress ? (
                <>
                    <Modal
                        isVisible={isVisible}
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={() => {
                            buyNFT({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccess(),
                            })
                            onClose()
                        }}
                    >
                    <Input
                        label="Send Ether"
                        name="Send Ether"
                        type="number"
                        onChange={(event) => {
                            setMsgValue(event.target.value)
                        }}
                    />
                    </Modal>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}