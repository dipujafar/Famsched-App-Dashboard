"use client";
import { useBlockUnblockUserMutation } from '@/redux/api/userApi';
import { Error_Modal } from '@/utils/modals';
import { message, Popconfirm, PopconfirmProps } from 'antd'
import React from 'react'
import { CgUnblock } from 'react-icons/cg'

export default function BlockUser({ id, isActive }: any) {
    const [userChangeStatus] = useBlockUnblockUserMutation();


    const confirmBlock: PopconfirmProps["onConfirm"] = async () => {
        try {
            if (isActive) {
                await userChangeStatus({ id, data: { status: "blocked" } }).unwrap();
                message.success("Blocked the user");
            } else {
                await userChangeStatus({ id, data: { status: "active" } }).unwrap();
                message.success("Unblocked the user");
            }
        }
        catch (error: any) {
            Error_Modal({ title: error?.data?.message });
        }

    };
    return (
        <Popconfirm
            title={isActive ? "Block the user" : "Unblock the user"}
            description={isActive ? "Are you sure to block this user?" : "Are you sure to unblock this user?"}
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
        >
            {isActive ? <CgUnblock size={22} color="#CD0335" /> : <CgUnblock size={22} color='green' />}
        </Popconfirm>
    )
}
