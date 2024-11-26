import { faEdit, faPlus, faSearch, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from './Modal'
import { useModal } from '../context/ModalContext'
import AddRole from './AddRole'
import { usePermission } from '../context/PermissionContext'
import AddPermission from './AddPermission'

const Permission = () => {

    const { permissions } = usePermission();
    // console.log(roles);
    const { isModalOpen, openModal, getModalContent } = useModal();

    const handleModal = (id = null, modalType) => {
        openModal();
        if (modalType == 'add') {
            console.log("hhh");
            getModalContent({ component: <AddPermission />, title: "Add New Permission" })
        }
        else if (modalType == 'edit') {
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <EditUser user={filteredUser[0]} />, title: "Edit Role" })
        }
        else if (modalType == 'delete') {
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <ConfirmDelete data={filteredUser[0]} />, title: "Delete Role" })
        }
    }


    return (
        <div className='p-5'>
            <div className='flex justify-end pb-5 gap-3'>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={() => handleModal(null, "add")}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className='grid grid-cols-[100px_.5fr_1fr_.8fr] items-center py-2 px-5 rounded-lg bg-light text-[#9a989a] font-semibold'>
                <div>Sr.No.</div>
                <div>Name</div>
                <div>Date</div>
                <div>Action</div>
            </div>
            {permissions && permissions.map((permission, index) => {
                return (
                    <div key={permission.id} className={`grid grid-cols-[100px_.5fr_1fr_.8fr] items-center py-2 px-5 rounded-lg ${index % 2 == 0 ? 'bg-white' : 'bg-light'}`}>
                        <div>{index + 1}</div>
                        <div>{permission.permissionName}</div>
                        <div>{permission.updatedAt}</div>
                        <div className='flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faEdit} className='text-theme' onClick={() => handleModal(permission.id, "edit")} />
                            <FontAwesomeIcon icon={faTrashCan} className='text-red-500' onClick={() => handleModal(permission.id, "role")} />
                        </div>
                    </div>

                )
            })}
            {isModalOpen && <Modal />}
        </div>
    )
}

export default Permission