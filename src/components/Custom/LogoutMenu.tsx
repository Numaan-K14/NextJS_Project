import { MdOutlineLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisVertical } from "react-icons/fa6";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LogoutMenu() {
  const router = useRouter();

  const LogoutHandle = (): void => {
    localStorage.clear();
    toast.success("Logged out successfully");
    router.push("/");
    // router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <FaEllipsisVertical className="text-white" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-10" align="center">
        <DropdownMenuItem onClick={LogoutHandle}>
          <span className="flex items-center justify-between w-full px-1 hover:text-red-600">
            <span className="text-[16px] font-bold">Log Out</span>
            <MdOutlineLogout className="text-xl font-bold" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



// import { MdOutlineLogout } from "react-icons/md";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { FaEllipsisVertical } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// export function LogoutMenu() {
//   const navigate = useNavigate();
//   function LogoutHandle() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logout Succesfully");
//     navigate("/login");
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button>
//           <FaEllipsisVertical className="text-white" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-10" align="end">
//         <DropdownMenuItem>
//           <span
//             onClick={LogoutHandle}
//             className="flex items-center justify-between w-full px-1 hover:text-red-600"
//           >
//             <span className="text-[16px] font-bold">Log Out</span>
//             <MdOutlineLogout className="text-xl font-bold" />
//           </span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }