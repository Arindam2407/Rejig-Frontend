import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function FollowImpl({profile, handle, isVisible, onClose}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const dispatch = useNotification()

    const {
        runContractFunction: follow,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "follow",
        msgValue: 0,
        params: {profileIds : [profile],
        datas: ["0x"]},
    })

    const {
        runContractFunction: gettokenURI,
        data: enterTxResponse1,
        isLoading1,
        isFetching1,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "tokenURI",
        msgValue: 0,
        params: {profileId : profile},
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
            message: `Profile ${profile} Followed`,
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
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
        <div className="p-5">
            {rejigAddress ? (
                <>
                    <Modal
                        isVisible={isVisible}
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={() => {
                            
                            onClose()
                        }}
                    >
                    <h1> {`Profile ${profile}'s handle is ${handle}`} </h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await follow({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccess(),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Follow"
                        )}
                    </button>
                    </Modal>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}