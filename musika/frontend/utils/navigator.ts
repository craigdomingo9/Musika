import { usePathname } from 'next/navigation';



function navigators(): [boolean,boolean,boolean,boolean] {
    const pathname = usePathname();

    let homeActive, exploreActive, bagActive, profileActive;

    switch (pathname) {
    case '/':
        homeActive = true;
        exploreActive = false;
        bagActive = false;
        profileActive = false;
        break;
    case '/explore':
        homeActive = false;
        exploreActive = true;
        bagActive = false;
        profileActive = false;
        break;
    case '/bag':
        homeActive = false;
        exploreActive = false;
        bagActive = true;
        profileActive = false;
        break;
    case '/profile':
        homeActive = false;
        exploreActive = false;
        bagActive = false;
        profileActive = true;
        break;
    
    default:
        homeActive = false;
        exploreActive = false;
        bagActive = false;
        profileActive = false;
    }

    if (pathname.endsWith("/admin")){
        homeActive = false;
        exploreActive = false;
        bagActive = false;
        profileActive = true;
    }
  return [homeActive, exploreActive, bagActive, profileActive]
}

export default navigators