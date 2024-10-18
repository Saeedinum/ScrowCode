import notificationsIcon from "@/assets/global/notifications.svg"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"

import { useGetOrdersOfStudentQuery, useHandleOrderOfTeamMutation } from "../api/ordersAPI"
import { useAppSelector } from "@/store/hooks"

const Notifications = () => {
  const token = useAppSelector(state => state.auth.user.token)
  const { data } = useGetOrdersOfStudentQuery({
    token: token
  })
  const [handleOrderOfTeam] = useHandleOrderOfTeamMutation()

  return (
    <Dialog>
      <DialogTrigger>
        <img src={notificationsIcon} alt="" />
      </DialogTrigger>
      <DialogContent className="absolute left-[calc(100%-30rem)] top-[60px] rounded-[8px] bg-[#ffffffbf] p-3 lg:w-[400px]" dir="rtl">
        <DialogTitle className="mb-5 flex text-end text-[20px] font-bold text-primary-first">الاشعارات</DialogTitle>

        {data?.data?.map((item: { _id: string; message: string }) => (
          <div key={item._id} className="my-3 flex flex-col">
            <p>{item.message}</p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => {
                  handleOrderOfTeam({
                    token: token!,
                    id: item._id,
                    status: "accept"
                  })
                }}
                className="h-[28px] w-[68px] rounded-[8px] bg-primary-first text-primary-fourth"
              >
                قبول
              </button>
              <button
                onClick={() => {
                  handleOrderOfTeam({
                    token: token!,
                    id: item._id,
                    status: "reject"
                  })
                }}
                className="h-[28px] w-[68px] rounded-[8px] border border-primary-first bg-primary-fourth text-primary-first"
              >
                رفض
              </button>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default Notifications
