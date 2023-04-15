export const fontColor = null

export const mainColor = "#5345ED"
export const secondaryColor = "white"

export const pageStyle = {
  width: "100%", 
  
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center",
  
  backgroundColor: "#5345ED",
  transition: 'color 10s ease-out, background-color 1s ease-out'
}

export const containerStyle = {
  position: "relative",
  width: 750,
    
  border: "solid black",
  borderColor: "#FFFFF7",
  borderRadius: 10,

  backgroundColor: "white"
}

export const buttonStyle = {
  backgroundColor: "#5345ED",
  padding: "7px 20px 7px 20px",
  borderRadius: 7,
  border: "none",

  color: "white",
  fontWeight: "bold"
}

export const inputStyle = {
  width: "calc(100% - 4px)",
  height: 34,
  marginTop: 5,
  marginBottom: 5,

  border: "solid gray 2px",
  borderRadius: 4,

  outlineColor: mainColor
}
