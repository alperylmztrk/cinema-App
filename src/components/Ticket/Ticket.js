import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from "@mui/material";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Ticket(props) {

    const { user, startDate, startTime, hallName, selectedSeatNumbers } = props;
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Biletiniz Oluşturuldu
                    </Typography>
                    <Stack direction={"row"} spacing={20} mt={2}>
                        <Typography variant="body1" color="initial">{user.name + " " + user.surname}</Typography>
                        <Stack>
                            <Typography variant="body1" color="initial">{startDate}</Typography>
                            <Typography variant="body1" color="initial">{startTime}</Typography>
                            <Typography variant="body1" color="initial">{hallName}</Typography>
                            <Typography variant="body1" color="initial">{selectedSeatNumbers}</Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>

               { !open &&
               navigate("/")
            }


        </div>
    );
}
export default Ticket;