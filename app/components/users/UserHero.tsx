import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../inputs/Avatar"

interface UserHeroProps {
  usersId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ usersId }) => {
  const { data: fetchedUser } = useUser(usersId);
  const image = fetchedUser.image || fetchedUser.profileImage || fetchedUser.coverImage
  return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {image && (
          <Image src={image} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar usersId={usersId} isLarge hasBorder />
        </div>
      </div>
    </div>
   );
}
 
export default UserHero;