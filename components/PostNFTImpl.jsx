import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Modal, Input } from "web3uikit"
import { ethers } from "ethers"

export default function PostNFTImpl({profileId, isVisible, onClose}) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [contentURI, setContentURI] = useState("");
    const [referenceModule, setReferenceModule] = useState("0x0000000000000000000000000000000000000000");
    const [referenceModuleInitData, setReferenceModuleInitData] = useState("0x");
    const [startingPrice, setStartingPrice] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [token1, setToken1] = useState("0x0000000000000000000000000000000000000000");
    const [nTokens1, setNTokens1] = useState(0);
    const [token2, setToken2] = useState("0x0000000000000000000000000000000000000000");
    const [nTokens2, setNTokens2] = useState(0);
    const [token3, setToken3] = useState("0x0000000000000000000000000000000000000000");
    const [nTokens3, setNTokens3] = useState(0);

    const dispatch = useNotification()

    const {
        runContractFunction: postNFT,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "postNFT",
        msgValue: 0,
        params: {vars : 
            [
                profileId,
                contentURI,
                referenceModule,
                referenceModuleInitData
            ],
            _startingPrice : startingPrice,
            _discountRate : discountRate,
            _tokens : [
                token1,
                nTokens1,
                token2,
                nTokens2,
                token3,
                nTokens3
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
            message: "NFT Post Created",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setContentURI("")
        setReferenceModule("0x0000000000000000000000000000000000000000")
        setReferenceModuleInitData("0x")
        setStartingPrice(0)
        setDiscountRate(0)
        setToken1("0x0000000000000000000000000000000000000000")
        setToken2("0x0000000000000000000000000000000000000000")
        setToken3("0x0000000000000000000000000000000000000000")
        setNTokens1(0)
        setNTokens2(0)
        setNTokens3(0)
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
        <div className="p-5 align-items: center">
            {rejigAddress ? (
                <>
                    <Modal
                        isVisible={isVisible}
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={() => {
                            postNFT({
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
                    <Input
                        label="Starting Price"
                        name="Starting Price"
                        type="number"
                        onChange={(event) => {
                            setStartingPrice(event.target.value)
                        }}
                    />
                    <Input
                        label="Discount Rate"
                        name="Discount Rate"
                        type="number"
                        onChange={(event) => {
                            setDiscountRate(event.target.value)
                        }}
                    />
                    <Input
                        label="Token1"
                        name="Token1"
                        type="string"
                        onChange={(event) => {
                            setToken1(event.target.value)
                        }}
                    />
                    <Input
                        label="No. of Token1"
                        name="No. of Token1"
                        type="number"
                        onChange={(event) => {
                            setNTokens1(event.target.value)
                        }}
                    />
                    <Input
                        label="Token2"
                        name="Token2"
                        type="string"
                        onChange={(event) => {
                            setToken2(event.target.value)
                        }}
                    />
                    <Input
                        label="No. of Token2"
                        name="No. of Token2"
                        type="number"
                        onChange={(event) => {
                            setNTokens2(event.target.value)
                        }}
                    />
                    <Input
                        label="Token3"
                        name="Token3"
                        type="string"
                        onChange={(event) => {
                            setToken3(event.target.value)
                        }}
                    />
                    <Input
                        label="No. of Token3"
                        name="No. of Token3"
                        type="number"
                        onChange={(event) => {
                            setNTokens3(event.target.value)
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