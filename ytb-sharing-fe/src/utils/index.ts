export function getId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
export const getLink = (link: string) => {
  const id = getId(link);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}`;
};
