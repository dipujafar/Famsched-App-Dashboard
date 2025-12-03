"use client";;
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useDebounce } from "use-debounce";
import moment from "moment";
import { useGetEarningQuery } from "@/redux/api/earningApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatContainer from "./StatContainer";
import { EarningStatSkeleton } from "./skeleton/EarningStatSkeleton";

type TDataType = {
  key?: number;
  user: any;
};


const EarningTable = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;

  const { data: earningsData, isLoading } = useGetEarningQuery(queries);



  if (isLoading) {
    return <div className="space-y-5">
      <EarningStatSkeleton />
      <TableSkeleton length={10} />
    </div>
  }


  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Name",
      render: (text, record) => (
        <p className="flex items-center gap-x-2">
          {record?.user?.profile ? <Image
            src={record?.user?.profile}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar> <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{record?.user?.name?.charAt(0)} </AvatarFallback></Avatar>

          }
          <span>{record?.user?.name}</span>
        </p>
      ),
    },
    {
      title: "Email",
      render: (_, record) => <p>{record?.user?.email}</p>,
    },
    {
      title: "Phone Number",
      render: (_, record) => <p>{record?.user?.phoneNumber}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },
  ];

  return (
    <div className="space-y-5">
      <StatContainer earningStatData={earningsData?.data?.earnings} />
      <div className="bg-section-bg rounded-3xl">
        <div className="max-w-[400px] ml-auto mb-2 pt-2">
          <Input.Search placeholder="Search here..." size="large" onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <DataTable columns={columns} data={earningsData?.data?.transactions?.data} pageSize={Number(limit)} total={earningsData?.data?.transactions?.meta?.total}></DataTable>
      </div>
    </div>
  );
};

export default EarningTable;
