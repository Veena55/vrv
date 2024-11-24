import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Users = () => {
    return (
        <div className='px-2'>
            <div className='flex justify-end pb-5'>
                <div className='inline-flex justify-end gap-1 items-center border rounded-lg bg-white shadow  pl-2 pr-5 py-1'>
                    <input className=' bg-white pr-5 py-1 focus-within:outline-none' />
                    <FontAwesomeIcon icon={faSearch} className='text-[#9a989a]' />
                </div>
            </div>
            <div className='grid grid-cols-6 py-2 px-5 rounded-lg bg-light text-[#9a989a] font-semibold'>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
                <div>Action</div>
            </div>
            <div className='grid grid-cols-6 py-2 px-5 rounded-lg bg-white'>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
                <div>Action</div>
            </div>
            <div className='grid grid-cols-6 py-2 px-5 rounded-lg bg-[#FAFAFC]'>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div className='bg-successBg text-succesText rounded-full shadow flex w-[max-content]  items-center justify-start px-3 gap-1 font-semibold'>
                    <FontAwesomeIcon icon={faCircle} className='text-[8px]' />
                    <p>Active</p>
                </div>
                <div>Action</div>
            </div>
        </div>
    )
}

export default Users