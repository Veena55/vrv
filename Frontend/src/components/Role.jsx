import { faEdit, faPlus, faSearch, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRole } from '../context/RoleContext'
import Modal from './Modal'
import { useModal } from '../context/ModalContext'
import AddRole from './AddRole'
import EditRole from './EditRole'
import ConfirmDelete from './DeleteUser'
import DeleteRole from './DeleteRole'

const Role = () => {

    const { roles } = useRole();
    console.log(roles);
    const { isModalOpen, openModal, getModalContent } = useModal();

    const handleModal = (id = null, modalType) => {
        openModal();
        if (modalType == 'add') {
            getModalContent({ component: <AddRole />, title: "Add New Role" })
        } else if (modalType == 'edit') {
            const filteredRole = roles.filter(role => role.id == id);
            getModalContent({ component: <EditRole role={filteredRole[0]} />, title: "Edit Role" })
        }
        else if (modalType == 'delete') {
            const filteredRole = roles.filter(role => role.id == id);
            getModalContent({ component: <DeleteRole data={filteredRole[0]} />, title: "Delete Role" })
        }
    }


    return (
        <div className='p-5'>
            <div className='flex justify-end pb-5 gap-3'>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={() => handleModal(null, "add")}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className='grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center py-2 px-5 rounded-lg bg-light text-[#9a989a] font-semibold'>
                <div>Sr.No.</div>
                <div>Name</div>
                <div>Permission</div>
                <div>Date</div>
                <div>Action</div>
            </div>
            {roles && roles.map((role, index) => {
                return (
                    <div key={role.id} className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${index % 2 == 0 ? 'bg-white' : 'bg-light'}`}>
                        <div>{index + 1}</div>
                        <div>{role.roleName}</div>
                        <div>{(role.Permissions).map((permission, index) => permission.permissionName).join(', ')}</div>


                        <div>{role.updatedAt}</div>
                        <div className='flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faEdit} className='text-theme' onClick={() => handleModal(role.id, "edit")} />
                            <FontAwesomeIcon icon={faTrashCan} className='text-red-500' onClick={() => handleModal(role.id, "delete")} />
                        </div>
                    </div>

                )
            })}
            {isModalOpen && <Modal />}
        </div>
    )
}

export default Role