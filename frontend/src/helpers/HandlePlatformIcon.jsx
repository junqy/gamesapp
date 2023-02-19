import {
    FaXbox,
    FaPlaystation,
    FaWindows,
    FaApple,
    FaAndroid,
    FaLinux,
    FaGlobe,
    FaGamepad,
} from "react-icons/fa";
import { SiNintendoswitch, SiWii } from "react-icons/si";

export const handlePlatformIcon = (type) => {
    switch (type) {
        case "xbox":
            return <FaXbox />;
        case "playstation":
            return <FaPlaystation />;
        case "pc":
            return <FaWindows />;
        case "nintendo":
            return <SiNintendoswitch />;
        case "apple":
            return <FaApple />;
        case "android":
            return <FaAndroid />;
        case "linux":
            return <FaLinux />;
        case "wii":
            return <SiWii />;
        case "web":
            return <FaGlobe />;
        default:
            return <FaGamepad />;
    }
};

export const handlePlatformSimplify = (type) => {
    switch (type) {
        case "xbox-series-x":
        case "xbox-one":
        case "xbox360":
        case "xbox-old":
            return 'xbox';
        case "playstation5":
        case "playstation4":
        case "playstation3":
        case "playstation2":
        case "playstation1":
        case "ps-vita":
        case "psp":
            return 'playstation';
        case "pc":
            return 'pc';
        case "nintendo-switch":
            return 'nintendo';
        case "ios":
        case "macos":
            return 'apple';
        case "android":
            return 'android';
        case "linux":
            return 'linux';
        case "wii-u":
        case "wii":
            return 'wii';
        case "web":
            return 'web';
        default:
            return 'default';
    }
};
