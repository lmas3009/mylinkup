import {signIn} from "next-auth/react"

const Header = () => {
    return(
        <div className="w-full flex items-center justify-between p-5 bg-black text-white">
            <p>MylinkUp</p>
            <div className="bg-white text-black  text-center p-1 pl-5 pr-5 rounded cursor-pointer" onClick={()=>signIn("google")}>
                <p>Create first MylinkUp</p>
            </div>
        </div>
    )
}

export default Header