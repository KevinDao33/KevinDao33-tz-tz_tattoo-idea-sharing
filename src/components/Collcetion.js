import React, {useEffect} from "react";

function Collection() {
  console.log(window.location.href);

  const getCollectionName = () => {
    const url = window.location.href;
    const decodeUrl = decodeURI(url);
    const lastSegment = decodeUrl.split("/").pop();
    console.log(lastSegment);
  };
  useEffect(() => {
    getCollectionName();
  }, []);

  return (
    <>
    {
        console.log('123')
        
    }
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>hihihihhihihi</div>
      <div>bye</div>
    </>
  );
}

export default Collection;
