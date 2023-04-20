import Head from 'next/head'
import Header from '../components/Header'
import { Inter } from 'next/font/google'
import { useState } from "react"
import Profile from '../components/Profile'
import ProfileBurn from '../components/ProfileBurn'
import BuyNFT from '../components/BuyNFT'
import Withdraw from '../components/Withdraw'
import { Input } from 'web3uikit'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [profileId,setProfileId] = useState(0);
  const [pubId,setPubId] = useState(0);
  return (
    <div>
      <Head> 
        <title> Rejig App </title>
        <meta name="description" content="Social Media for Web3"/>
        <link rel="icon" href="./favicon.ico"/>
      </Head>
      <Header/>
      <div>
      <Input
                        label="Profile Id"
                        name="Profile Id"
                        type="number"
                        onChange={(event) => {
                            setProfileId(event.target.value)
                        }}
                    />
                    <Input
                        label="Pub Id"
                        name="Pub Id"
                        type="number"
                        onChange={(event) => {
                            setPubId(event.target.value)
                        }}
                    />
        <BuyNFT profileId={profileId} pubId={pubId}/>
        <Withdraw/>
      </div>
    </div>
  )
}