export const textSubstring = (text, max = 200) => {
   const newText = text.substr(0, max);
   const threeDots = text.length > max ? "..." : "";

   return newText + threeDots;
};
