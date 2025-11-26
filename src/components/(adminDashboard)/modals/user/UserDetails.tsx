import { Modal } from "antd";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: any;
};

const UserDetails = ({ open, setOpen, data }: TPropsType) => {
  const [currentData, setCurrentData] = useState<any>({});

  useEffect(() => {
    setCurrentData(data);
  }, [data]);


  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center  ">
          <h4 className="text-lg font-medium">Account Details</h4>
          <div
            className="w-10 h-10 bg-[#F6BEBF]  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#E12728" className="" />
          </div>
        </div>

        {/* --------------------- user details information ---------------------------- */}
        <div className="w-fit mx-auto relative">
          <Avatar className="size-38">
            <AvatarImage className="size-36" src={currentData?.profile} />
            <AvatarFallback className=" flex-center uppercase text-2xl bg-gray-200 text-black  size-36" >{currentData?.name?.split(" ")?.length ? `${currentData?.name?.split(" ")?.[0]?.charAt(0)}${currentData?.name?.split(" ")?.[1]?.charAt(0)}` : currentData?.name?.charAt(0)}  </AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-10">
          <div className="flex justify-between bg-[#ECF2F0]  py-3 px-2">
            <h4>User name :</h4>
            <p className="font-medium">{currentData?.name}</p>
          </div>
          <div className="flex justify-between   py-3 px-2">
            <h4>Email :</h4>
            <p className="font-medium">{currentData?.email} </p>
          </div>
          <div className="flex justify-between bg-[#ECF2F0]  py-3 px-2">
            <h4>Contact Number :</h4>
            <p className="font-medium">{currentData?.phone}</p>
          </div>
          <div className="flex justify-between   py-3 px-2">
            <h4>Address :</h4>
            <p className="font-medium">{currentData?.address}</p>
          </div>

          <div className="flex justify-between  py-3 px-2 bg-[#ECF2F0]">
            <h4>Date of Join :</h4>
            <p className="font-medium">{moment(currentData?.createdAt).format("ll")}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
