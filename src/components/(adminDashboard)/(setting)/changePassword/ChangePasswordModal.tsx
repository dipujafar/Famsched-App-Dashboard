import { Button, Form, Input, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/redux/features/authSlice";
import { Error_Modal } from "@/utils/modals";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const ChangePasswordModal = ({ open, setOpen }: TPropsType) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();



  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const handleSubmit = async (values) => {
    const formattedData = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    }

    try {
      await changePassword(formattedData).unwrap();
      toast.success("Successfully Change password", { duration: 1000 });
      form.resetFields();
      dispatch(logout());
      router.refresh();
    }
    catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        style={{
          minWidth: "max-content",
        }}
      >
        <div className="py-14">
          <div
            className="w-12 h-12 bg-main-color  absolute top-2 right-2 rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={18}
              color="#fff"
              className="absolute top-1/3 left-1/3"
            />
          </div>

          {/* header */}
          <div>
            <h4 className=" text-2xl font-medium text-center">
              Change Password
            </h4>
            <p className="mt-1 text-center">
              Your password must be 8-10 character long.
            </p>
          </div>

          {/* form */}

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{
              maxWidth: 500,
              marginTop: "25px",
            }}
          >
            {/*  input old password */}
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please Enter Old Password" }]}
            >
              <Input.Password size="large" placeholder="Enter old password " />
            </Form.Item>

            {/*  input  new Password*/}
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: "Please set your new password!" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
                  message:
                    "Password must contain at least one lowercase, one uppercase, and one special character.",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Set new password" />
            </Form.Item>

            {/* input  confirm number  */}
            <Form.Item
              label="Re-enter new password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match with new password!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter new password"
              />
            </Form.Item>

            {/* <p
              onClick={() => {
                setOpen(false);
                setOpenModal(true);
              }}
              className="mb-5 font-medium cursor-pointer text-main-color"
            >
              Forget password?
            </p> */}

            <Button loading={isLoading} htmlType="submit" size="large" block>
              Update Password
            </Button>
          </Form>
        </div>
      </Modal>
      {/* forget password Modal */}
      <ForgetPasswordModal
        open={openModal}
        setOpen={setOpenModal}
      ></ForgetPasswordModal>
    </>
  );
};

export default ChangePasswordModal;
