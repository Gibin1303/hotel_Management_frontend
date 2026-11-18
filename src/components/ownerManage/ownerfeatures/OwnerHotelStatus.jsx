const OwnerHotelStatus = ({ status }) => {

  const statusStyle = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    BLOCKED: "bg-gray-100 text-gray-700",
  };


  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">
        Status
      </h2>


      <span
        className={`
          inline-flex
          px-4
          py-2
          rounded-full
          text-sm
          font-medium
          ${statusStyle[status] || "bg-gray-100 text-gray-700"}
        `}
      >
        {status}
      </span>

    </div>
  );
};


export default OwnerHotelStatus;