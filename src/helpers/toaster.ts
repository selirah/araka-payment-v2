import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const toast = (message: string, success: boolean) => {
  toastr.options = {
    positionClass: 'toast-top-full-width',
    preventDuplicates: false,
    hideDuration: 300,
    timeOut: 5000,
  };
  toastr.clear();
  switch (success) {
    case true:
      setTimeout(() => toastr.success(message), 300);
      break;
    case false:
      setTimeout(() => toastr.error(message), 300);
      break;
    default:
      return null;
  }
};

export { toast };
