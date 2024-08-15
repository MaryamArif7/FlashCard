import { SignIn } from '@clerk/nextjs'
import Navbar from '../../../componetss/navbar'

export default function Page() {

  return  <div className='flex justify-center items-center'> <Navbar />  <SignIn/> </div> 
} 