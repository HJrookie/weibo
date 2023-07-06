export function isVideoFile(fileName: string) {
  const suffixs = [
    ".mp4",
    ".3gp",
    ".avi",
    ".wmv",
    ".mpeg",
    ".mpg",
    ".mkv",
    ".mov",
    ".flv",
    ".swf",
    ".qsv",
    ".kux",
    ".mpg",
    ".rm",
    ".ts",
    ".ram",
  ];
  return suffixs.some((suffix) => fileName.toLocaleLowerCase().endsWith(suffix));
}

export function getFileSize(v: number) {
  let arr = ["B", "KB", "MB", "GB"],
    i = 0;
  while (v > 1000) {
    v = v / 1000;
    i++;
  }
  return v.toFixed(2) + arr[i];
}

export function getVvidFromCode(s: string) {
  s = s.replace(/=/, "-");
  return (s.match(/([a-zA-Z]){2,5}[-=0]{1,5}([0-9]+)/g)?.[0] ?? "").toLocaleUpperCase();
}
