'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
        dark:hover:bg-[#1e293b]
    

      "
    >
      {label}
    </div>
   );
}
 
export default MenuItem;