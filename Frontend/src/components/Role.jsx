import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { useRole } from '../context/RoleContext'
import Modal from './Modal'
import { useModal } from '../context/ModalContext'
import AddRole from './AddRole'
import EditRole from './EditRole'
import DeleteRole from './DeleteRole'
import { useTheme } from '../context/ThemeContext'
import { useValidatePermission } from '../context/ValidatePermissionContext'

const Role = () => {
    const { theme } = useTheme();
    const { roles } = useRole();
    const { validatePermission } = useValidatePermission();;
    const { isModalOpen, openModal, getModalContent } = useModal();

    const handleModal = (id = null, modalType) => {
        if (!validatePermission(modalType, "role")) {
            toast.info("You don't have permission!");
            return;
        }
        if (modalType == 'add') {
            openModal();
            getModalContent({ component: <AddRole />, title: "Add New Role" })
        } else if (modalType == 'edit') {
            openModal();
            const filteredRole = roles.filter(role => role.id == id);
            getModalContent({ component: <EditRole role={filteredRole[0]} />, title: "Edit Role" })
        }
        else if (modalType == 'delete') {
            openModal();
            const filteredRole = roles.filter(role => role.id == id);
            getModalContent({ component: <DeleteRole data={filteredRole[0]} />, title: "Delete Role" })
        }
    }


    return (
        <div className='p-5'>
            <div className='flex justify-end pb-5 gap-3'>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={() => handleModal(null, "add")}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${theme == 'light' ? 'bg-light text-[#9a989a]' : 'bg-gray-800 text-white'} font-semibold`}>
                <div>Sr.No.</div>
                <div>Name</div>
                <div>Permission</div>
                <div>Date</div>
                <div>Action</div>
            </div>
            {roles && roles.map((role, index) => {
                return (
                    <div key={role.id} className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${theme == 'light' ? (index % 2 == 0 ? 'bg-white' : 'bg-light') : (index % 2 == 0 ? 'bg-gray-900 text-white' : 'bg-black text-white')}`}>
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