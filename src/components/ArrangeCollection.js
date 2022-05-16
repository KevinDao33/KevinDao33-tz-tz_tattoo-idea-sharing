/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import "../styles/style.css";
import {doc, getDoc, updateDoc} from "firebase/firestore";
// import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'

import {
  PinImageArrange,
  ArrangeNavWrapper,
  ArrangeBackButton,
  ArrangeTitle,
  SaveButton,
} from "../styles/Collection.module";

function ArrangeCollection(props) {
  const [columns, setColumns] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [pinsInCollection, setPinsInCollection] = useState([]);
  const [columnA, setColumnA] = useState([]);
  const [columnB, setColumnB] = useState([]);
  const [columnC, setColumnC] = useState([]);
  const [columnD, setColumnD] = useState([]);

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
    const {source, destination} = result;
    if (!result.destination) return;

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
    console.log("all columns", unprocessedColumns);
    let combinedColumn = [];
    const aLength = columns.column0A.items.length;
    const bLength = columns.column1B.items.length;
    const cLength = columns.column1B.items.length;
    const dLength = columns.column1B.items.length;

    for (let i = 0; i < Math.max(aLength, bLength, cLength, dLength); i++) {
      for (let j = 0; j < unprocessedColumns.length; j++) {
        if (!unprocessedColumns[j][i]) {
          combinedColumn.push(0);
        } else {
          combinedColumn.push(unprocessedColumns[j][i]);
        }
      }
    }

    const filteredCombinedColumn = combinedColumn.filter((e) => {
      return typeof e !== "number";
    });
    console.log("filteredCombinedColumn", filteredCombinedColumn);

    const collectionRef = doc(
      props.db,
      "user",
      props.uid,
      "collection",
      collectionName
    );

    await updateDoc(collectionRef, {
      pins: filteredCombinedColumn,
    });
    // alert("changes saved");
    await Swal.fire(
      'Changes saved',
      '',
      'success'
    )
    window.location.reload();

    return;
  };

  return (
    <>
      <ArrangeNavWrapper>
        <ArrangeBackButton
          onClick={() => {
            const leave = confirm(
              "changes not saved yet, do you want to leave?"
            );
            if (leave) {
              props.switch2Show();
            }
          }}></ArrangeBackButton>
        <ArrangeTitle>Arranging : {collectionName}</ArrangeTitle>
        <SaveButton onClick={saveNewPinOrder}>save</SaveButton>
      </ArrangeNavWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "75%",
          margin: "30px auto 10px auto",
          borderRadius: "20px",
          boxShadow: "inset 0 4px 10px rgba(0, 0, 0, 0.3)",
          // border: "5px solid blue",
        }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "22%",
                  // border: "3px solid yellow",
                }}
                key={columnId}>
                <div
                  style={{
                    margin: 8,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    // border: "4px solid red",
                  }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            // background: "snow",
                            padding: "4px",
                            // width: "90%",
                            minHeight: "50vh",
                            // backdropFilter: "blur(8px)",
                            // border: "4px solid purple",
                          }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.pinId}
                                draggableId={item.pinId}
                                index={index}>
                                {(provided) => {
                                  return (
                                    <PinImageArrange
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      // style={{
                                      //   ...provided.draggableProps.style,
                                      //   top: 0,
                                      //   left: 0,
                                      //   zIndex: 6000,
                                      // }}
                                      src={item.pinImage}></PinImageArrange>
                                    // <PinImageArrange
                                    //   ref={provided.innerRef}
                                    //   {...provided.draggableProps}
                                    //   {...provided.dragHandleProps}

                                    //   style={{top: 0, left: 0}}

                                    //   src={item.pinImage}></PinImageArrange>
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

export default ArrangeCollection;
