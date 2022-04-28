/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
// import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import "../styles/style.css";
import {doc, getDoc} from "firebase/firestore";

// import Masonry from "react-masonry-css";
// import arrangeIcon from "../icon/arrange.png";
// import removeIcon from "../icon/remove.png";
// import {SHOW_PINS} from "../const";
// import {ARRANGE_PINS} from "../const";
// import {DELETE_PINS} from "../const";

// import {
//   CollectionHeader,
//   //   UserPhoto,
//   CollectionName,
//   AllButtonWrapper,
//   ButtonWrapper,
//   Button,
//   ButtonName,
//   // SaveOrderButton,
//   AllPinsWrapper,
//   PinWrapper,
//   PinImage,
//   RemoveButton,
//   ShowEmptyMessage,
//   // DragPinWrapper,
// } from "../styles/Collection.module";

function ArrangeCollection(props) {
  const [columns, setColumns] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [pinsInCollection, setPinsInCollection] = useState([]);

  const getCollectionName = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();
    setCollectionName(lastSegment);

    const getPinsInCollection = async (id) => {
      const querySnapshot = await getDoc(
        doc(props.db, "user", id, "collection", lastSegment)
      );
      const pinsInCollec = querySnapshot.data();

      setPinsInCollection(pinsInCollec.pins);
    };

    getPinsInCollection(props.uid);
  };

  useEffect(() => {
    props.uid && getCollectionName();
  }, [props.uid]);

  const itemsFromBackend = [
    {id: uuid(), content: "First task"},
    {id: uuid(), content: "Second task"},
    {id: uuid(), content: "Third task"},
    {id: uuid(), content: "Fourth task"},
    {id: uuid(), content: "Fifth task"},
  ];

  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      //   items: itemsFromBackend,
      items: pinsInCollection,
    },
    [uuid()]: {
      name: "To do",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  };

  useEffect(() => {
    pinsInCollection && setColumns(columnsFromBackend);
  }, [pinsInCollection]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}>
              <h2>{column.name}</h2>
              <div style={{margin: 8}}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.pinId}
                              draggableId={item.pinId}
                              index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}>
                                    {item.pinName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

// function ArrangeCollection(props) {
//   const [pinsInCollection, setPinsInCollection] = useState([]);
//   const [collectionName, setCollectionName] = useState("");
//   const [handlePin, setHandlePin] = useState(SHOW_PINS);

//   const getCollectionName = () => {
//     const url = window.location.href;
//     const decodeUrl = decodeURI(url);
//     const lastSegment = decodeUrl.split("/").pop();
//     setCollectionName(lastSegment);

//     const getPinsInCollection = async (id) => {
//       const querySnapshot = await getDoc(
//         doc(props.db, "user", id, "collection", lastSegment)
//       );
//       const pinsInCollec = querySnapshot.data();
//       setPinsInCollection(pinsInCollec);
//     };
//     getPinsInCollection(props.uid);
//   };

//   useEffect(async () => {
//     getCollectionName();
//   }, [props.uid]);

//   // const handleOnDragEnd = (result) => {
//   //   if (!result.destination) return;

//   //   const items = Array.from(pinsInCollection.pins);
//   //   const [reorderedItem] = items.splice(result.source.index, 1);
//   //   items.splice(result.destination.index, 0, reorderedItem);

//   //   setPinsInCollection((prev) => ({...prev, pins: items}));
//   // };

// //   const breakpointColumnsObj = {
// //     default: 4,
// //     1100: 3,
// //     700: 2,
// //     500: 1,
// //   };

//   const switch2Show = () => {
//     setHandlePin(SHOW_PINS);
//   };

//   const switch2Arrange = () => {
//     setHandlePin(ARRANGE_PINS);
//   };

//   const switch2Delete = () => {
//     setHandlePin(DELETE_PINS);
//   };

//   return <div>hi arrange</div>;
// }

export default ArrangeCollection;

{
  /* <SaveOrderButton
onClick={() =>
alert(
"firebase doesn't support soting array orders, so the change won't be saved; however, feel free to come back an play with the drag and drop function."
)
}>
save
</SaveOrderButton> */
}
