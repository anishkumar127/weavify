import React, { useLayoutEffect } from 'react';
import Swal from 'sweetalert2';
/*                              NOTES - ANISH
type: AlertIcon, title: string, text: string, isBehindVisible: boolean, IsConfirmBtn: boolean

    - type -> success, error, warning, info, question
    - title -> success, error, warning, info, question
    - isBehindVisible -> true, false - Background is visible or not
    - IsConfirmBtn -> true, false - Confirm button is visible or not
    - CustomClass -> Custom Class for popup and title - Will Be In Future.
*/

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

interface CustomAlertProps {
  type: AlertType;
  title?: string;
  text: string;
  isBehindVisible?: boolean;
  isConfirmBtn?: boolean;
  countdown?: number;
  popupCustomClass?: string;
  id?: string;
}

export const Alerts: React.FC<CustomAlertProps> = ({
  type = 'warning',
  title = 'Skip',
  text,
  isBehindVisible = true,
  isConfirmBtn = false,
  countdown = 2000,
  popupCustomClass = 'alerts',
  id = '#alert-anish-add-new',
}) => {
  useLayoutEffect(() => {
    const applySwalContainerStyles = () => {
      // Get Swal's container directly
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
          // Custom Classes Based on our needs. [ANISH]
          popup: popupCustomClass,
          title: 'sweet-custom-title-class',
        },
        //  overlay based on condiiton.
        backdrop: isBehindVisible,
        showConfirmButton: isConfirmBtn,
        timer: countdown,
        allowOutsideClick: false,
        didOpen: () => {
          // Ensure styles are applied right after opening
          applySwalContainerStyles();
        },
      };

      Swal.fire(config);
    };
    showSweetAlert();
    // Clean up the event - unmounts
    return () => {
      // if it is need. // anish
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
