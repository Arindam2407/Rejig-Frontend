import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function PubImpl({userProfileId, profileId, pubId, isVisible, onClose, isTypeComment}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const[contentURIc, setContentURIc] = useState("")

    const dispatch = useNotification()

    const {
        runContractFunction: comment,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "comment",
        msgValue: 0,
        params: {vars : 
        [
            userProfileId,
            contentURIc,
            profileId,
            pubId,
            "0x",
            "0x0000000000000000000000000000000000000000",
            "0x"
        ]},
    })

    const {
        runContractFunction: mirror,
        data: enterTxResponse_1,
        isLoading_1,
        isFetching_1,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "mirror",
        msgValue: 0,
        params: {vars : 
        [
            userProfileId,
            profileId,
            pubId,
            "0x",
            "0x0000000000000000000000000000000000000000",
            "0x"
        ]},
    })

    async function updateUIValues() {
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])


    const handleNewNotificationc = () => {
        dispatch({
            type: "success",
            message: `Comment Made`,
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setContentURIc("")
    }

    const handleSuccessc = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotificationc(tx)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewNotificationm = () => {
        dispatch({
            type: "success",
            message: `Post Mirrored`,
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
    }

    const handleSuccessm = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotificationm(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-5">
            {rejigAddress ? (isTypeComment? (
                <>
                    <Modal
                        isVisible={isVisible}
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={() => {
                            onClose()
                        }}
                    >
                    <Input
                        label="Content URI"
                        name="Enter Content URI"
                        type="string"
                        onChange={(event) => {
                            setContentURIc(event.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await comment({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccessc(),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Confirm Comment"
                        )}
                    </button>
                    </Modal>
                </>) : (<>
                    <Modal
                        isVisible={isVisible}
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={() => {
                            onClose()
                        }}
                    >
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await mirror({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccessm(),
                            })
                        }
                        disabled={isLoading_1 || isFetching_1}
                    >
                        {isLoading_1 || isFetching_1 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Confirm Mirror"
                        )}
                    </button>
                    </Modal>
                    </>
                )
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}