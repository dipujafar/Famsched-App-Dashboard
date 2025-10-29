"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/modals/user/UserDetails";
import { CgUnblock } from "react-icons/cg";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  profileImage: string;
  phoneNumber: string;
};

const data: TDataType[] = Array.from({ length: 10 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Cody Fisher",
  email: "codyfisher@gmail.com",
  date: "11 Sep, 2025",
  profileImage: "/user_image.png",
  phoneNumber: "+9112655423",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const AccountDetailsTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text, record) => (
        <p className="flex items-center gap-x-2">
          <Image
            src={record?.profileImage}
            alt="user_image"
            width={40}
            height={40}
          />
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
      title: "Registration Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Eye size={22} color="#5C5C5C" onClick={() => setOpen(true)} />

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
      <div className="max-w-[400px] ml-auto mb-2 pt-2">
        <Input.Search placeholder="Search here..." size="large" />
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default AccountDetailsTable;
