import {
    Input ,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const UpdateModal = ({open, handleOpen, title, }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody divider>
        <div className="w-full">
            <Input label="Amount in USD" />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateModal;
