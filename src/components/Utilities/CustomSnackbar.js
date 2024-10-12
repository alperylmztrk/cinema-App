import { Alert, AlertTitle, Snackbar } from "@mui/material";

function CustomSanckbar(props) {
  const { open, onClose, severity, title, message } = props;

  return (
    <Snackbar
      sx={{ marginTop: 6 }}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default CustomSanckbar;
