// export const converTime = (time) => {
//   const date = new Date(time);
//   const now = new Date();
//   const timeDiff = now - date;
//   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//   const minutes = Math.floor(timeDiff / (1000 * 60));
//   const seconds = Math.floor(timeDiff / 1000);

//   if (seconds < 60) {
//     return `${seconds} giây trước`;
//   } else if (minutes < 60) {
//     return `${minutes} phút trước`;
//   } else if (hours < 24) {
//     return `${hours} giờ trước`;
//   } else if (days < 30) {
//     return `${days} ngày trước`;
//   } else {
//     const formattedDate = date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
//     return `${formattedDate}`;
//   }
// };

// export const converTimeShort = (time) => {
//   const date = new Date(time);
//   const now = new Date();
//   const timeDiff = now - date;
//   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//   const minutes = Math.floor(timeDiff / (1000 * 60));
//   const seconds = Math.floor(timeDiff / 1000);

//   if (seconds < 60) {
//     return `${seconds} giây`;
//   } else if (minutes < 60) {
//     return `${minutes} phút`;
//   } else if (hours < 24) {
//     return `${hours} giờ`;
//   } else if (days < 30) {
//     return `${days} ngày`;
//   } else {
//     const formattedDate = date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
//     return `${formattedDate}`;
//   }
// };


export const converTime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const timeDiff = now - date;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const seconds = Math.floor(timeDiff / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else {
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
    return `${formattedDate}`;
  }
};

export const converTimeShort = (time) => {
  const date = new Date(time);
  const now = new Date();
  const timeDiff = now - date;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const seconds = Math.floor(timeDiff / 1000);

  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (hours < 24) {
    return `${hours} hours`;
  } else if (days < 30) {
    return `${days} days`;
  } else {
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
    return `${formattedDate}`;
  }
};
