import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const Modal = ({ open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;