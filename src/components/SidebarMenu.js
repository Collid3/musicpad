import React from "react";

const SidebarMenu = ({
  beat,
  api,
  setBeats,
  menu,
  setMenu,
  setResponseMessage,
  setLoadingMessage,
  setLoading,
  setNowPlaying,
  nowPlaying,
}) => {
  const handleDelete = async () => {
    setLoading(true);
    setMenu(false);
    setLoadingMessage("Deleting song...");
    try {
      const response = await api.delete(`song/${beat._id}`);
      if (response.data.success) {
        setResponseMessage(response.data.success);
      }

      setTimeout(() => {
        setResponseMessage(null);
      }, 2000);

      setBeats((prev) => {
        return prev.filter((Beat) => Beat._id !== beat._id);
      });

      if (nowPlaying._id === beat._id) {
        setNowPlaying(null);
      }
      setLoading(false);
      console.log("done");
      return setLoadingMessage(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ul
      className={`${
        menu.opened && menu?.beat?._id === beat._id && "menu-open"
      }`}
    >
      <li>Rename</li>
      <li onClick={handleDelete}>Delete</li>
    </ul>
  );
};

export default SidebarMenu;
