"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import UserDetails from "@/components/(adminDashboard)/modals/user/UserDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  profileImage: string;
  phoneNumber: string;
  amount: string;
};

const data: TDataType[] = Array.from({ length: 10 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Cody Fisher",
  email: "codyfisher@gmail.com",
  date: "11 Sep, 2025",
  profileImage: "/user_image.png",
  phoneNumber: "+9112655423",
  amount: "$244.00",
}));

const EarningTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Name",
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
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
  ];

  return (
    <div className="bg-section-bg rounded-3xl">
      <div className="max-w-[400px] ml-auto mb-2 pt-2">
        <Input.Search placeholder="Search here..." size="large" />
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      {/* <UserDetails open={open} setOpen={setOpen}></UserDetails> */}
    </div>
  );
};

export default EarningTable;
