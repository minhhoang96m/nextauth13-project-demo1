'use client'

import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  const {resolvedTheme} = useTheme()
  const [iconColor, setIconColor] = useState('')

  useEffect(() => {
    mutateCurrentUser();

    setIconColor(resolvedTheme === 'dark' ? 'black' : 'white')
  }, [mutateCurrentUser,resolvedTheme]);
 
  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return ( 
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color={iconColor} size={32} />
          <p className="text-white dark:text-black">
            {notification.body}
          </p>
        </div>
        ))}
    </div>
   );
}
 
export default NotificationsFeed;