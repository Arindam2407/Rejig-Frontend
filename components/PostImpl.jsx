import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function ProfileCreation({profileId, isVisible, onClose}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [contentURI, setContentURI] = useState("");
    const [referenceModule, setReferenceModule] = useState("0x0000000000000000000000000000000000000000");
    const [referenceModuleInitData, setReferenceModuleInitData] = useState("0x");

    const dispatch = useNotification()

    const {
        runContractFunction: post,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "post",
        msgValue: 0,
        params: {vars : 
        [
            profileId,
            contentURI,
            referenceModule,
            referenceModuleInitData
        ]},
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
            message: "Post Created",
            title: "Post Creation Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setContentURI("")
        setReferenceModule("0x0000000000000000000000000000000000000000")
        setReferenceModuleInitData("0x")
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
                            post({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccess(),
                            })
                            onClose()
                        }}
                    >
                    <Input
                        label="Content URI"
                        name="Enter Content URI"
                        type="string"
                        onChange={(event) => {
                            setContentURI(event.target.value)
                        }}
                    />
                    <Input
                        label="Reference Module"
                        name="Enter Reference Module (Optional)"
                        type="string"
                        onChange={(event) => {
                            setReferenceModule(event.target.value)
                        }}
                    />
                    <Input
                        label="Reference Module Init Data"
                        name="Enter Reference Module Init Data (Optional)"
                        type="string"
                        onChange={(event) => {
                            setReferenceModuleInitData(event.target.value)
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