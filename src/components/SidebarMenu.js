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
      }, 3000);

      setBeats((prev) => {
        return prev.filter((Beat) => Beat._id !== beat._id);
      });

      setLoading(false);
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
