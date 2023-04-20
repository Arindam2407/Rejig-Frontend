import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return(
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Rejig</h1>
            <div className="flex flex-row items-center">
                <Link legacyBehavior href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link legacyBehavior href="/profile">
                    <a className="mr-4 p-6">Profile</a>
                </Link>
                <Link legacyBehavior href="/transactions">
                    <a className="mr-4 p-6">Buy NFT</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}