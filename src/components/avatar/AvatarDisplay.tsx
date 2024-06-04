import {Avatar} from "@nextui-org/react";
import { useState } from "react";

const AvatarDisplay = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return <Avatar showFallback src='https://images.unsplash.com/broken' />
}

export default AvatarDisplay;