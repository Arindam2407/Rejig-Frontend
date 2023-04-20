import Head from 'next/head'
import Header from '../components/Header'
import { Inter } from 'next/font/google'
import Profile from '../components/Profile'
import ProfileBurn from '../components/ProfileBurn'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head> 
        <title> Rejig App </title>
        <meta name="description" content="Social Media for Web3"/>
        <link rel="icon" href="./favicon.ico"/>
      </Head>
      <Header/>
      <div>
      <Profile/>
      <ProfileBurn/>
      </div>
    </div>
  )
}