import React from "react";

function FileUpload(props){
    return(
        <form className="fileUploader" action={"http:"+props.access+":8080/file/insert"} method="post" encType="multipart/form-data">
            <input type="hidden" name="writer" value={window.sessionStorage.getItem("userId")}/>
            <input type="hidden" name="post_id" value={props.post_id}/>
            <div className="selectUploadFile"><input type="file" name="file" multiple/></div>
            <div className="fileUploadButton"><input type="submit" value="업로드"/></div>
        </form>
    );
}

export default FileUpload;