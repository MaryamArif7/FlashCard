import { SignUp } from '@clerk/nextjs'
import Navbar from '../../../componetss/navbar'
export default function Page() {
  return <> <Navbar /> <div className='flex justify-center items-center'>  <SignUp/> </div>  </>
}