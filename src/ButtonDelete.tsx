import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {
  onDelete: () => void;
}

function ButtonDeleteStore({onDelete, ...args}: ButtonProps) {

  return (
    <>
      <button onClick={onDelete} {...args}>Удалить все записи</button>
    </>
  );
}

export default ButtonDeleteStore;
