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
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import moment from "moment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

const AccountDetailsTable = () => {
  const [open, setOpen] = useState(false);

  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;

  const { data: usersData, isLoading } = useGetAllUsersQuery(queries);
  const [currentData, setCurrentData] = useState<TDataType | null>(null);

  const users = usersData?.data?.data || [];

  if (isLoading) return <TableSkeleton length={10} />

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      render: (text, record, index) => <p>
        {
          `# ${Number(page) === 1
            ? index + 1
            : (Number(page) - 1) * Number(limit) + index + 1
          }`}
      </p>,
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
      title: "Registration Date",
      dataIndex: "date",
      render: (text) => (
        <p>{moment(text).format("ll")}</p>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Eye size={22} color="#5C5C5C" onClick={() => { setOpen(true); setCurrentData(record) }} />

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
        <Input.Search placeholder="Search here..." size="large" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <DataTable columns={columns} data={users} pageSize={10} total={usersData?.data?.meta?.total}></DataTable>
      <UserDetails open={open} setOpen={setOpen} data={currentData}></UserDetails>
    </div>
  );
};

export default AccountDetailsTable;
