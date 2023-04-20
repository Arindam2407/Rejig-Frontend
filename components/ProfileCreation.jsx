import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function ProfileCreation({isVisible, onClose}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [handle, setHandle] = useState("");
    const [imageURI, setImageURI] = useState("");

    const dispatch = useNotification()

    const {
        runContractFunction: createProfile,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "createProfile",
        msgValue: 0,
        params: {vars : [
            account,
            handle,
            imageURI,
            "0x0000000000000000000000000000000000000000",
            "0x",
            "",
            "0x0000000000000000000000000000000000000000",
            ""
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
            message: "Profile Created",
            title: "Profile Creation Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setHandle("")
        setImageURI("")
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
                            createProfile({
                                onError: (error) => {
                                    console.log(error)
                                },
                                onSuccess: () => handleSuccess(),
                            })
                            onClose()
                        }}
                    >
                    <Input
                        label="Profile Handle"
                        name="Set Profile Handle (only smallcaps and no special chars)"
                        type="string"
                        onChange={(event) => {
                            setHandle(event.target.value)
                        }}
                    />
                    <Input
                        label="Image URI"
                        name="Set Image URI"
                        type="string"
                        onChange={(event) => {
                            setImageURI(event.target.value)
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