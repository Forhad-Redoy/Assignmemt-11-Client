import { BsFingerprint } from 'react-icons/bs'
import { IoStar } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { GrUserAdmin } from 'react-icons/gr'
// import { useState } from 'react'
import BecomeChefModal from '../../Modal/BecomeChefModal'
import MenuItem from './MenuItem'
const CustomerMenu = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />
      <MenuItem icon={IoStar} label='My Reviwes' address='my-reviews' />
      <MenuItem icon={MdFavorite} label='My Favorite' address='my-favorite' />

      {/* <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Chef</span>
      </div>

      <BecomeChefModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  )
}

export default CustomerMenu
