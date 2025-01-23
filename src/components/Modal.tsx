import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ReusableModal: React.FC<ReusableModalProps> = ({ open, onClose, title, content, actions }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {title && (
          <Typography variant="h2" component="h2" className="!font-semibold" gutterBottom>
            {title}
          </Typography>
        )}
        <div>{content}</div>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          {actions || (
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
