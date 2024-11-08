import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableUploadListItemProps } from "../interface";

export const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
    width: "100%",
    maxWidth: "247px",
    overflow: "hidden",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "is-dragging" : ""}
      {...attributes}
      {...listeners}
    >
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};
