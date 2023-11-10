'use client'
// import useAuth from "@/hooks/useAuth"
import { Button } from "./ui/button";
import MyAvatar from "./MyAvatar";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const { user: userSession, setUser: setUserSession } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('email');
        setUserSession(null);
        window.location.reload();
    };

    useEffect(() => {

    }, [userSession])

    return (
        <nav className="max-h-[5rem] sticky top-0 z-[50] border-b-[2px] border-primary">
            <div className="flex justify-between items-center h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-[8rem] bg-opacity-20 shadow-sm px-12 py-3 ">

                <div>
                    <Link href="/">
                        <span className=" text-secondary text-xl font-bold">TrackerMate</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {

                        userSession ? <>
                            <Button variant={'outline'} className="bg-black border-[1px] border-green-400 text-white">
                                <div onClick={handleLogout}>
                                    Logout
                                </div>
                            </Button>
                            <MyAvatar />

                        </>
                            : <>
                                <Link href={"/register"}>
                                    <Button variant={'outline'} className="bg-black border-[1px] border-green-400 text-white">
                                        Register
                                    </Button>
                                </Link>
                                <Link href={"/login"}>
                                    <Button variant={'secondary'} className=" un">
                                        Login
                                    </Button>
                                </Link>
                            </>

                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar