import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Input, Modal } from "web3uikit"
import { ethers } from "ethers"

export default function Setter({_profileId}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const dispatch = useNotification()

    const[_dispatcher, set_Dispatcher] = useState("")
    const[_imageURI, set_ImageURI] = useState("")
    const[_followModule, set_FollowModule] = useState("0x0000000000000000000000000000000000000000")
    const[_followModuleInitData, set_FollowModuleInitData] = useState("")
    const[_followNFTURI, set_FollowNFTURI] = useState("")

    const {
        runContractFunction: setDispatcher,
        data: enterTxResponse1,
        isLoading1,
        isFetching1,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "setDispatcher",
        msgValue: 0,
        params: {profileId: _profileId,
        dispatcher : _dispatcher},
    })

    const {
        runContractFunction: setProfileImageURI,
        data: enterTxResponse2,
        isLoading2,
        isFetching2,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "setProfileImageURI",
        msgValue: 0,
        params: {profileId: _profileId,
        imageURI : _imageURI},
    })

    const {
        runContractFunction: setFollowModule,
        data: enterTxResponse3,
        isLoading3,
        isFetching3,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "setFollowModule",
        msgValue: 0,
        params: {profileId: _profileId,
        followModule : _followModule, followModuleInitData : _followModuleInitData},
    })

    const {
        runContractFunction: setFollowNFTURI,
        data: enterTxResponse4,
        isLoading4,
        isFetching4,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "setFollowNFTURI",
        msgValue: 0,
        params: {profileId: _profileId,
        followNFTURI : _followNFTURI},
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
            <h1 className="py-4 px-4 font-bold text-3xl">Setter Functions</h1>
            {rejigAddress ? (
                <>
                <div>
                <Input
                        label="Set Dispatcher"
                        name="Set Dispatcher"
                        type="string"
                        onChange={(event) => {
                            set_Dispatcher(event.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await setDispatcher({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading1 || isFetching1}
                    >
                        {isLoading1 || isFetching1 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Set Dispatcher"
                        )}
                    </button>
                </div>
                <div>
                <Input
                        label="Set Profile Image URI"
                        name="Set Profile Image URI"
                        type="string"
                        onChange={(event) => {
                            set_ImageURI(event.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await setProfileImageURI({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading2 || isFetching2}
                    >
                        {isLoading2 || isFetching2 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Set Profile Image URI"
                        )}
                    </button>
                </div>
                <div>
                <Input
                        label="Set Follow Module"
                        name="Set Follow Module"
                        type="string"
                        onChange={(event) => {
                            set_FollowModule(event.target.value)
                        }}
                    />
                    <Input
                        label="Set Follow Module Init Data"
                        name="Set Follow Module Init Data"
                        type="string"
                        onChange={(event) => {
                            set_FollowModuleInitData(event.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await setFollowModule({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading3 || isFetching3}
                    >
                        {isLoading3 || isFetching3 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Set Follow Module"
                        )}
                    </button>
                </div>
                <div>
                <Input
                        label="Set Follow NFT URI"
                        name="Set Follow NFT URI"
                        type="string"
                        onChange={(event) => {
                            set_FollowNFTURI(event.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await setFollowNFTURI({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading4 || isFetching4}
                    >
                        {isLoading4 || isFetching4 ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Set Follow NFT URI"
                        )}
                    </button>
                </div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}