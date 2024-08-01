import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Phrase } from "@/app/lib/definitions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Phrases } from "./phrases";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  phrases: Phrase[];
};

export default function ScrollDialog({ open, setOpen, phrases }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="flex flex-row justify-between items-center">
            Phrases
            <XMarkIcon
              className="h-[25px] w-[25px] cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Phrases phrases={phrases} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
