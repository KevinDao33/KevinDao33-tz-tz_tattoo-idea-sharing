/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
// import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {v4 as uuid} from "uuid";
import "../styles/style.css";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
// import Masonry from "react-masonry-css";
// import arrangeIcon from "../icon/arrange.png";
// import removeIcon from "../icon/remove.png";
// import {SHOW_PINS} from "../const";
// import {ARRANGE_PINS} from "../const";
// import {DELETE_PINS} from "../const";

import {
  // CollectionHeader,
  //   UserPhoto,
  // CollectionName,
  //   AllButtonWrapper,
  //   ButtonWrapper,
  // Button,
  //   ButtonName,
  //   SaveOrderButton,
  //   AllPinsWrapper,
  //   PinWrapper,
  // PinImage,
  PinImageArrange,
  ArrangeNavWrapper,
  BackButton,
  SaveButton,
  //   RemoveButton,
  //   ShowEmptyMessage,
  // DragPinWrapper,
} from "../styles/Collection.module";

function ArrangeCollection(props) {
  const [columns, setColumns] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [columnA, setColumnA] = useState([]);
  const [columnB, setColumnB] = useState([]);
  const [columnC, setColumnC] = useState([]);
  const [columnD, setColumnD] = useState([]);

  const redirect = useNavigate();

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

  const seperateTestingArray = (array) => {
    let columnAArrange = [];
    let columnBArrange = [];
    let columnCArrange = [];
    let columnDArrange = [];
    array.forEach((element, index) => {
      if (index % 4 === 0) {
        columnA.push(element);
      } else if (index % 4 === 1) {
        columnB.push(element);
      } else if (index % 4 === 2) {
        columnC.push(element);
      } else if (index % 4 === 3) {
        columnD.push(element);
      }
    });
    setColumnA(columnAArrange);
    setColumnB(columnBArrange);
    setColumnC(columnCArrange);
    setColumnD(columnDArrange);
  };

  useEffect(() => {
    pinsInCollection.length > 0 && seperateTestingArray(pinsInCollection);
  }, [pinsInCollection]);

  const columnsFromBackend = {
    column0A: {
      name: "column-A",
      items: columnA,
    },
    column1B: {
      name: "column-B",
      items: columnB,
    },
    column2C: {
      name: "column-C",
      items: columnC,
    },
    column3D: {
      name: "column-D",
      items: columnD,
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

  const saveNewPinOrder = () => {
    // console.log(columnA.items.concat(columnB.items).concat(columnC.items).concat(columnD.items));
    Object.values(columns).length > 0
      ? upDateCombinedColumns()
      : console.log("there's nothing");
  };

  const upDateCombinedColumns = async () => {
    let unprocessedColumns = [
      columns.column0A.items,
      columns.column1B.items,
      columns.column2C.items,
      columns.column3D.items,
    ];
    let combinedColumn = [];
    for (let i = 0; i < unprocessedColumns[0].length; i++) {
      for (let j = 0; j < unprocessedColumns.length; j++) {
        if (!unprocessedColumns[j][i]) {
          break;
        }
        combinedColumn.push(unprocessedColumns[j][i]);
      }
    }

    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
      "collection",
      collectionName
    );

    await updateDoc(collectionRef, {
      pins: combinedColumn,
    });
    alert("changes saved");
    window.location.reload();

    return;
  };

  return (
    <>
      <ArrangeNavWrapper>
        <BackButton
          onClick={() => {
            const leave = confirm(
              "changes not saved yet, do you want to leave?"
            );
            if (leave) {
              props.switch2Show();
            }
          }}>
          {"<-"}
        </BackButton>
        <h2
          style={{
            fontSize: "2rem",
            textAlign: "center",
            margin: "auto",
          }}>
          Arranging : {collectionName}
        </h2>
        <SaveButton onClick={saveNewPinOrder}>save</SaveButton>
      </ArrangeNavWrapper>
      {/* <Button>save</Button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "1400px",
          margin: "30px auto 10px auto",
          borderRadius: "20px",
          boxShadow: "inset 0 4px 10px rgba(0, 0, 0, 0.3)",
        }}>
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
                <div
                  style={{margin: 8, border: "1px solid red", width: "330px"}}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "white"
                              : "white",
                            padding: 4,
                            width: "330px",
                            minHeight: "100vh",
                          }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.pinId}
                                draggableId={item.pinId}
                                index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    //   <div
                                    //     ref={provided.innerRef}
                                    //     {...provided.draggableProps}
                                    //     {...provided.dragHandleProps}
                                    //     style={{
                                    //       userSelect: "none",
                                    //       padding: 16,
                                    //       margin: "0 0 8px 0",
                                    //       minHeight: "50px",
                                    //       backgroundColor: snapshot.isDragging
                                    //         ? "#263B4A"
                                    //         : "#456C86",
                                    //       color: "white",
                                    //       animation: snapshot.isDragging
                                    //         ? "shake 0.5s"
                                    //         : "",
                                    //       animationIterationCount:"infinite",

                                    //       ...provided.draggableProps.style,
                                    //     }}>
                                    //     {item.pinName}
                                    //   </div>
                                    <PinImageArrange
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      src={item.pinImage}
                                      // style={{
                                      //   userSelect: "none",
                                      //   padding: 16,
                                      //   margin: "0 0 8px 0",
                                      //   minHeight: "50px",
                                      //   backgroundColor: snapshot.isDragging
                                      //     ? "#263B4A"
                                      //     : "#456C86",
                                      //   color: "white",
                                      //   animation: snapshot.isDragging
                                      //     ? "shake 0.5s"
                                      //     : "",
                                      //   animationIterationCount:"infinite",

                                      //   ...provided.draggableProps.style,
                                      // }}
                                    ></PinImageArrange>
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
    </>
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
