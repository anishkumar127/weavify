import React, { useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Alerts } from './Alerts';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

interface ConfirmAlertProps {
  type: AlertType;
  title?: string;
  text: string;
  isBehindVisible?: boolean;
  isConfirmBtn?: boolean;
  countdown?: number;
  popupCustomClass?: string;
  id?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  successText?: string;
  isSuccessAlert?: boolean;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmAlerts: React.FC<ConfirmAlertProps> = ({
  type = 'warning',
  title = 'Skip',
  text,
  isBehindVisible = true,
  isConfirmBtn = true,
  popupCustomClass = 'confirmAlerts',
  id = '#alert-anish-add-new',
  confirmButtonText = 'Yes',
  cancelButtonText = 'No',
  successText = 'Deleted Successfully',
  isSuccessAlert = false,
  showCancelButton = true,
  confirmButtonColor = '#3085d6',
  cancelButtonColor = '#d33',
  onConfirm,
  onCancel,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  useLayoutEffect(() => {
    const applySwalContainerStyles = () => {
      const container = Swal.getContainer();
      if (container) {
        container.style.position = 'absolute';
        container.style.top = '50%';
        container.style.right = '0';
        container.style.transform = 'translateY(-50%)';
      }
    };

    const showSweetAlert = () => {
      const config = {
        title: title !== 'Skip' ? title : '',
        icon: type,
        text,
        target: id,
        customClass: {
          popup: popupCustomClass,
          title: 'sweet-custom-title-class',
        },
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText,
        backdrop: isBehindVisible,
        showConfirmButton: isConfirmBtn,
        allowOutsideClick: false,
        didOpen: () => {
          applySwalContainerStyles();
        },
      };

      Swal.fire(config).then((result) => {
        if (result.isConfirmed) {
          if (onConfirm) onConfirm();
          if (isSuccessAlert) {
            setShowSuccess(true);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          if (onCancel) onCancel();
        }
      });
    };

    showSweetAlert();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{showSuccess && <Alerts type={'success'} text={successText} id={id} />}</>;
};
