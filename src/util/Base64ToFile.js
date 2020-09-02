const baseToFile = {
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  dataURLtoDownload(dataurl, name) {
    let blob = this.dataURLtoBlob(dataurl);
    blob.lastModifiedDate = new Date();
    blob.name = name;
    let url = URL.createObjectURL(blob);
    return url;
  },
  dataURLtoDownloadLink(dataurl, fileName) {
    let url = this.dataURLtoDownload(dataurl, fileName);
    let save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = url;
    save_link.download = fileName;
    save_link.click();
  }
};
export { baseToFile };
