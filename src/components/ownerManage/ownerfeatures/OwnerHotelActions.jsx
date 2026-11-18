import { Edit, Plus, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HotelForm from "./HotelForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RoomForm from "./AddRoooms";
import Modal from "@/components/common/Modal";

const OwnerHotelActions = ({ hotelId }) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);

  const navigate = useNavigate();

  console.log(hotelId, "get hotelIds");

  return (
    <div className="flex flex-wrap gap-3">
      {/* Edit Hotel */}
      {/* <Button
        // onClick={() => navigate(`/owner/hotel/edit/${hotelId}`)}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <Edit className="w-4 h-4" />
        Edit Hotel
      </Button> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Hotel
          </Button>
        </DialogTrigger>

        {open && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <HotelForm hotelId={hotelId} onSuccess={() => setOpen(false)} />
          </DialogContent>
        )}
      </Dialog>

      {/* Add Room */}
      <Button
        variant="outline"
        // onClick={() => navigate(`/rooms/add/${hotelId}`)}
        onClick={() => setRoomsOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Room
      </Button>

      {/* Add Room */}
      <Button
        variant="outline"
        // onClick={() => navigate(`/rooms/add/${hotelId}`)}
        onClick={() => setRoomsOpen(!roomsOpen)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Room
      </Button>
{/* 
      <Dialog open={roomsOpen} onOpenChange={setRoomsOpen}>
        <DialogContent className=" w-[95vw] max-h-[90vh] overflow-y-auto">
          <RoomForm />
        </DialogContent>
      </Dialog> */}

           <Modal open={roomsOpen} onOpenChange={setRoomsOpen}>
                 <RoomForm/>
             
            </Modal>

      {/* Manage Rooms */}
      <Button
        variant="outline"
        onClick={() => navigate(`/owner/hotel/${hotelId}/rooms`)}
        className="flex items-center gap-2"
      >
        <BedDouble className="w-4 h-4" />
        Manage Rooms
      </Button>
    </div>
  );
};

export default OwnerHotelActions;
