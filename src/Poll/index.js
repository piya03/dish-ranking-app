import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "../CommonComponent/Loader";
import { useDispatch, useSelector } from "react-redux";
import { SUBMIT_POLL_INFO } from "../reducers/polls.reducer";
import CommonBtn from "../CommonComponent/CommonBtn";
import DishUploadForm from "../CommonComponent/DishUploadForm";
import BackBtn from "../CommonComponent/BackBtn";
import DishRankingUI from "../CommonComponent/DishRankingUI";
import DishSelectionUI from "../CommonComponent/DishSelectionUI";
import "./style.css";
import { navigate } from "@reach/router";

const Poll = ({ pollId }) => {
  const url = "https://api.cloudinary.com/v1_1/img24/upload";

  const activeUserFromStore = useSelector((state) => state.activeuser.username);

  // activeUserFromStore
  // pollId

  const activePollObject = useSelector((state) => {
    return state?.pollsReducer?.polls?.find((each) => {
      return each.pollId === pollId;
    });
  });

  const [screensData, setScreensData] = React.useState(() => {
    if (activePollObject?.pollInfo?.[activeUserFromStore]) {
      return activePollObject?.pollInfo?.[activeUserFromStore];
    } else {
      return [{}, {}, {}, {}];
    }
  });

  // 1 - 4
  const [activeScreen, setActiveScreen] = React.useState(1);

  // {
  //   imgUrl: "sdasdasd",
  //   files: files
  // }
  async function uploadFileFun(file) {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e91pibqf");

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();

      return response;
    } catch (e) {
      console.error("Some thing went wrong while uploading file");
      return null;
    }

    // for (let i = 0; i < files?.length; i++) {

    // }
  }
  function onChangeFile(e, index) {
    if (e.target.value.length == 0) {
      return;
    }
    const files = e.target.files;
    const imageFile = files[0];
    let imgUrl = "";
    if (imageFile) {
      imgUrl = window.URL.createObjectURL(imageFile);
    }

    const copyScreensData = [...screensData];

    if (index === 0) {
      /// update first screen
      copyScreensData[0].imgURL = imgUrl;
      copyScreensData[0].file = imageFile;
    }

    if (index === 1) {
      copyScreensData[1].imgURL = imgUrl;
      copyScreensData[1].file = imageFile;
    }

    setScreensData(copyScreensData);
  }
  // search ion localstorage if the poll data for this poll for this user is there

  const [pollData, setPollData] = React.useState(null);

  const orderRef = React.useRef([]);

  const dispatch = useDispatch();

  const [apiState, setApiState] = React.useState({
    isFetching: false,
    isFetched: false,
    isFailure: false,
  });
  async function onClickNextOrSubmit() {
    switch (activeScreen) {
      case 1: {
        // add validation here
        // if fields are not there then return

        if (
          screensData[0]?.title?.trim() == "" ||
          screensData[0]?.discription?.trim() == "" ||
          !screensData[0]?.imgURL
        ) {
          return;
        }
        if (!screensData[0]?.id) {
          screensData[0].id = uuidv4();
          setScreensData([...screensData]);
        }
        setActiveScreen(2);
        return;
      }

      case 2: {
        // add validation here
        // if fields are not there then return

        if (
          screensData[1]?.title?.trim() == "" ||
          screensData[1]?.discription?.trim() == "" ||
          !screensData[1]?.imgURL
        ) {
          return;
        }

        if (!screensData[1]?.id) {
          screensData[1].id = uuidv4();
          setScreensData([...screensData]);
        }

        setActiveScreen(3);

        return;
      }
      case 3: {
        if (screensData[2].selectedArray?.length > 0) {
          setActiveScreen(4);
        }
        return;
      }

      case 4: {
        const firstImgUrl = screensData[0]?.imgURL;
        const secondImgUrl = screensData[1]?.imgURL;

        const needToUploadFirstOne = firstImgUrl.startsWith("blob");
        const needToUploadSecondOne = secondImgUrl.startsWith("blob");
        let uploadedFirstImageUrl = "";
        let uploadedSecondImageUrl = "";

        setApiState({
          ...apiState,
          isFetching: true,
          isFetched: false,
          isFailure: false,
        });

        if (needToUploadFirstOne) {
          const response = await uploadFileFun(screensData[0]?.file);
          if (response) {
            uploadedFirstImageUrl = response.url;
          } else {
            console.error("Error uploading first image");
          }
        }

        if (needToUploadSecondOne) {
          const response = await uploadFileFun(screensData[1]?.file);
          if (response) {
            uploadedSecondImageUrl = response.url;
          } else {
            console.error("Error uploading second image");
          }
        }

        // retting the screen data with actual urls
        if (needToUploadFirstOne) {
          screensData[0].imgURL = uploadedFirstImageUrl;
          screensData[0].file = null;
        }

        if (needToUploadSecondOne) {
          screensData[1].imgURL = uploadedSecondImageUrl;
          screensData[1].file = null;
        }

        if (
          (needToUploadSecondOne && uploadedSecondImageUrl) ||
          (needToUploadFirstOne && uploadedFirstImageUrl)
        ) {
          setApiState({
            ...apiState,
            isFetching: false,
            isFetched: true,
            isFailure: false,
          });
        }

        if (!needToUploadSecondOne && !needToUploadFirstOne) {
          setApiState({
            ...apiState,
            isFetching: false,
            isFetched: true,
            isFailure: false,
          });
        }
        // data, activePollId, username
        // SUBMIT_POLL_INFO

        dispatch({
          type: SUBMIT_POLL_INFO,
          data: screensData,
          activePollId: pollId,
          username: activeUserFromStore,
        });

        navigate("/polls");
      }
      default:
        return;
    }
  }

  let currentOrder =
    screensData[3]?.rankOfDishes ||
    screensData?.slice(0, 2)?.map((each) => each.id) ||
    [];

  function getAllDishesForThisPoll() {
    const allPollInfo = activePollObject?.pollInfo || {};
    return Object.keys(allPollInfo).reduce((acc, keyusername) => {
      if (keyusername === activeUserFromStore) {
        return acc;
      } else {
        const partInfo = allPollInfo[keyusername]?.slice(0, 2);
        return [...acc, ...partInfo];
      }
    }, []);
  }

  return (
    <div className="p-3" style={{ maxWidth: "450px", margin: "0px auto" }}>
      {activeScreen > 1 && (
        <BackBtn
          onClick={() => {
            if (activeScreen > 1) {
              setActiveScreen(activeScreen - 1);
            }
          }}
        />
      )}
      {activeScreen === 1 && (
        <DishUploadForm
          uniqueId={0}
          onChangeFile={onChangeFile}
          imgUrl={screensData[0]?.imgURL || ""}
          title={screensData[0]?.title || ""}
          setTitle={(value) => {
            screensData[0].title = value;
            setScreensData([...screensData]);
          }}
          discription={screensData[0]?.discription || ""}
          setDiscription={(value) => {
            screensData[0].discription = value;
            setScreensData([...screensData]);
          }}
        />
      )}
      {activeScreen === 2 && (
        <DishUploadForm
          onChangeFile={onChangeFile}
          uniqueId={1}
          imgUrl={screensData[1]?.imgURL || ""}
          imgUrl={screensData[1]?.imgURL || ""}
          title={screensData[1]?.title || ""}
          setTitle={(value) => {
            // if(screensData[1]) {

            // }
            screensData[1].title = value;
            setScreensData([...screensData]);
          }}
          discription={screensData[1]?.discription || ""}
          setDiscription={(value) => {
            screensData[1].discription = value;
            setScreensData([...screensData]);
          }}
        />
      )}
      {activeScreen === 3 && (
        <DishSelectionUI
          pollId={pollId}
          data={(screensData?.slice(0, 2) || []).concat(
            getAllDishesForThisPoll()
          )}
          selectedArray={screensData[2]?.selectedArray || []}
          onChangeCheckBox={(checked, id) => {
            screensData[3].rankOfDishes = [];
            setScreensData([...screensData]);
            if (screensData[2].selectedArray?.length === 3 && checked) {
              alert("You cannot select more than 3");
              return;
            }

            let arrInScreensData = [...(screensData[2].selectedArray || [])];

            // const isNotThereAlready = arrInScreensData.indexOf(id) === -1;

            if (checked) {
              arrInScreensData.push(id);
            }

            if (!checked) {
              const foundIndex = arrInScreensData.indexOf(id);
              arrInScreensData.splice(foundIndex, 1);
            }
            screensData[2].selectedArray = arrInScreensData;
            setScreensData([...screensData]);
            // if(isNotThereAlready && checked) {
            //   // the case in which the dish id is not selected
            //   arrInScreensData.push(id)
            // }
          }}
        />
      )}
      {activeScreen === 4 && (
        <DishRankingUI
          selectedArray={screensData[2]?.selectedArray || []}
          order={currentOrder}
          data={(screensData?.slice(0, 2) || []).concat(
            getAllDishesForThisPoll()
          )}
          onChangeOrder={(order) => {
            orderRef.current = order;
            screensData[3].rankOfDishes = order;
            setScreensData([...screensData]);
          }}
        />
      )}
      <div
        style={{
          width: "130px",
          margin: "auto",
        }}
      >
        <CommonBtn
          disabled={apiState.isFetching ? true : false}
          text={
            apiState.isFetching ? (
              <Loader />
            ) : activeScreen === 4 ? (
              "Submit Poll"
            ) : (
              "Next"
            )
          }
          handleClick={onClickNextOrSubmit}
        />
      </div>{" "}
    </div>
  );
};

export default Poll;
