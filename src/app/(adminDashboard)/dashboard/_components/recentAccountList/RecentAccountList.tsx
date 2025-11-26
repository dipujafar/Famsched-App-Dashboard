"use client";
import { Image, message, Popconfirm, PopconfirmProps, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/modals/user/UserDetails";
import { CgUnblock } from "react-icons/cg";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import moment from "moment";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  profile: string;
  phoneNumber: string;
};



const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const RecentAccountList = () => {
  const [open, setOpen] = useState(false);
  const { data: usersData, isLoading } = useGetAllUsersQuery({ limit: 5 });
  const [currentData, setCurrentData] = useState<TDataType | null>(null);

  const users = usersData?.data?.data || [];

  if (isLoading) return <TableSkeleton length={5} />

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      render: (text, record, index) => <p>#{index + 1}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text, record) => (
        <p className="flex items-center gap-x-2">
          {record?.profile ? <Image
            src={record?.profile}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{text?.charAt(0)} </AvatarFallback></Avatar>

          }
          {text}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },

    {
      title: "Join Date",
      dataIndex: "createdAt",
      align: "center",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Eye size={22} color="#5C5C5C" onClick={() => { setOpen(!open); setCurrentData(record) }} />

          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-3xl">
      <h1 className="text-[#000000] text-xl font-normal py-3 px-2">
        Recent Users
      </h1>
      <DataTable columns={columns} data={users}></DataTable>
      <UserDetails open={open} setOpen={setOpen} data={currentData}></UserDetails>
    </div>
  );
};

export default RecentAccountList;
