import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { RiCloseFill } from "react-icons/ri";

const CloseButton = styled(RiCloseFill)({
  color: "white",
  transform: "rotate(90deg)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "rotate(180deg)",
    transition: "transform 0.3s",
  },
});

type IconButtonClickProp = { onClick?: React.MouseEvent<HTMLElement> };
type AdditionalIconButtonProps = IconButtonProps & IconButtonClickProp;

export const CloseButtonX = (props: AdditionalIconButtonProps) => (
  <IconButton {...props} edge="end">
    <CloseButton />
  </IconButton>
);
