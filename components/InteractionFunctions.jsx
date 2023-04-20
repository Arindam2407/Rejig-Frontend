import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function InteractionFunctions() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const dispatch = useNotification()

    const {
        runContractFunction: buyNFT,
        data: enterTxResponse_5,
        isLoading_5,
        isFetching_5,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "buyNFT",
        msgValue: BigInt(1100000000000000000),
        params: {_owner : "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", _pubId : 1},
    })

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess_5 = async (tx) => {
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
            <h1 className="py-4 px-4 font-bold text-3xl">Interaction Functions</h1>
            {rejigAddress ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await buyNFT({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess_5,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading_5 || isFetching_5}
                    >
                        {isLoading_5 || isFetching_5 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Buy NFT"
                        )}
                    </button>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}