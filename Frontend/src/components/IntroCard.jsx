import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from '../assets/user-dashboard.png';
import { faEnvelope, faTag } from '@fortawesome/free-solid-svg-icons';

const IntroCard = () => {
    return (
        <div className="w-full h-auto flex items-center justify-between px-10 py-2 bg-theme rounded-md text-white">
            <div>
                <h1 className="text-3xl">Welcome, <span className='font-bold '>Veena Rao</span></h1>
                <p className='text-lg pt-1'> <FontAwesomeIcon icon={faTag} /> <span className='pl-1'>Admin</span></p>
                <p className="text-light pt-1">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className='pl-2'>abc@gmail.com</span>
                </p>
            </div>
            <div className='-mt-20'>
                <img src={user} className='scale-[1.7]' width={250} alt="" />
            </div>
        </div>

    )
}

export default IntroCard