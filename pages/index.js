import Image from 'next/image'
import Head from 'next/head'
import Header from '../components/Header'
import ManualHeader from '../components/ManualHeader'
import { Inter } from 'next/font/google'
import { useState } from "react"
import { Input } from 'web3uikit'
import InteractionFunctions from '../components/InteractionFunctions'
import Follow from '../components/Follow'
import Post from '../components/Post'
import PostNFT from '../components/PostNFT'
import Pub from '../components/Pub'
import Profile from '../components/Profile'

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
        <Follow/>
        <Post/>
        <PostNFT/>
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
        <Pub profileId={profileId} pubId={pubId}/>
      </div>
    </div>
  )
}
