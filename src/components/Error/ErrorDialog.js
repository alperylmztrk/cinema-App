import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/auth_helper";

export default function ErrorDialog({ error, onClose }) {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    onClose(); // Dialog'ı kapat
    logout();
    window.dispatchEvent(new Event("storage"));
    navigate("/login"); // Kullanıcıyı giriş sayfasına yönlendir
   
  };

  return (
    <Dialog open={!!error} onClose={onClose}>
      <DialogTitle>Hata</DialogTitle>
      <DialogContent>
        <p>{error?.data.message}</p>
      </DialogContent>
      <DialogActions>
        {error?.status === 401 ? (
          <Button onClick={handleLoginRedirect} color="primary">
            Giriş Yap
          </Button>
        ) : (
          <Button onClick={onClose} color="primary">
            Kapat
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
