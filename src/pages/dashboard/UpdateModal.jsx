import {
    Input ,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const UpdateModal = ({open, handleOpen, title, val, setVal, submit}) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody divider>
        <div className="w-full">
            <Input value={val} onChange={(e) => setVal(e.target.value)} label="Amount in USD" required />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" onClick={()=> {
          handleOpen()
          submit()
          
        }}>
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateModal;
