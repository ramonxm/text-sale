import { styled } from "~/styled";

export const Content = styled("div", {
  maxWidth: "600px",
  backgroundColor: "transparent",
  display: "flex",
  margin: "34px auto 0",
  justifyContent: "center",
  flexDirection: "column",
  "@media (min-width: 1900px)": {
    marginLeft: "20%",
  },
});

export const ContainerElementText = styled("div", {
  marginTop: "20px",
  cursor: "pointer",
  backgroundColor: "initial",
});

export const WrapperPersonaName = styled("div", {
  overflow: "hidden",
  maxWidth: "101px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
