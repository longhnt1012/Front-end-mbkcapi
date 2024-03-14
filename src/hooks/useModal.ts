import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (title?: any) => {
    setIsOpen(!isOpen);
  };

  return { handleOpen, isOpen };
}

export default useModal;
