import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification, Card, Input } from "web3uikit"
import { ethers } from "ethers"
import WithdrawImpl from "./WithdrawImpl"

export default function Withdraw() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    const rejigAddress = "rejig proxy" in contractAddresses ? contractAddresses["rejig proxy"] : null

    const [showModal, setShowModal] = useState(false)
    const [bondId, setBondId] = useState(0)
    const [availableToWithdraw, setAvailableToWithdraw] = useState(0)

    const hideModal = () => setShowModal(false)

    const {
        runContractFunction: getAvailableToWithdraw,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["rejig proxy"],
        contractAddress: rejigAddress,
        functionName: "getAvailableToWithdraw",
        msgValue: 0,
        params: {_withdrawals : [bondId]},
    })

    async function updateUIValues() {
        const availableToWithdrawFromCall = await getAvailableToWithdraw();
        console.log(availableToWithdrawFromCall);
        setAvailableToWithdraw(availableToWithdrawFromCall);
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
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Withdraw Bonds</h1>
            {rejigAddress ? (
                <>
                <div>
                <WithdrawImpl
                bondId={bondId}
                availableToWithdraw = {availableToWithdraw}
                isVisible={showModal}
                onClose={hideModal}/>
                <Input
                        label="Bond to Redeem"
                        name="Bond to Redeem"
                        type="number"
                        onChange={(event) => {
                            setBondId(event.target.value)
                        }}></Input>
                            <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={handleCardClick}
                    >
                        {"Redeem"}
                    </button>
                </div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}