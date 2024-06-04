import {Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useState } from "react";

const AvatarDisplay = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Display an avatar that when clicked, will show a dropdown menu
    // with options to log out or view profile
    // return (
    //     <div>
    //         <Avatar
    //             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //             showFallback
    //             src='https://images.unsplash.com/broken'
    //         />
    //         {isDropdownOpen && (
    //             <div className='absolute top-12 right-0 bg-white shadow-md p-2'>
    //                 <button onClick={() => alert('View Profile')}>View Profile</button>
    //                 <button onClick={() => alert('Log Out')}>Log Out</button>
    //             </div>
    //         )}
    //     </div>
    // )

    return (
        <Dropdown>
        <DropdownTrigger>
            <Avatar
                showFallback
                src='https://images.unsplash.com/broken'
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownMenu>
        </Dropdown>
    );
}

export default AvatarDisplay;