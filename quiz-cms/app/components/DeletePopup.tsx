import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";

const DeletePopup = ({
  onDelete,
  onCancel,
}: {
  onDelete: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>This content will be deleted permanently</h1>
      <p> Are you sure?</p>

      <div className="flex justify-between">
        <DeleteButton onDelete={onDelete} />
        <CancelButton onCancel={onCancel} />
      </div>
    </div>
  );
};

export default DeletePopup;
