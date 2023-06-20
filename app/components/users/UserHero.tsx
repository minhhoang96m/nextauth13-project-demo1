import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

interface UserHeroProps {
  usersId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ usersId }) => {
  const { data: fetchedUser } = useUser(usersId);

  return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.image && (
          <Image src={fetchedUser.image} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar usersId={usersId} isLarge hasBorder />
        </div>
      </div>
    </div>
   );
}
 
export default UserHero;